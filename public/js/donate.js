// Initialize Stripe with test key
const stripe = Stripe('pk_test_51OxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
const elements = stripe.elements();

// Create card element
const card = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
});

// Mount card element
card.mount('#card-element');

// Handle real-time validation errors
card.addEventListener('change', ({error}) => {
    const displayError = document.getElementById('card-errors');
    if (error) {
        displayError.textContent = error.message;
    } else {
        displayError.textContent = '';
    }
});

// Handle donation type selection
const donationTypeBtns = document.querySelectorAll('.donation-type-btn');
donationTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        donationTypeBtns.forEach(b => {
            b.classList.remove('active', 'bg-blue-600', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-700');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('bg-gray-200', 'text-gray-700');
    });
});

// Handle amount selection
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmountInput = document.querySelector('input[type="number"]');
let selectedAmount = 0;

function updateAmount(amount) {
    selectedAmount = amount;
    const processingFee = calculateProcessingFee(amount);
    const total = amount + processingFee;
    
    document.getElementById('donation-amount').textContent = amount.toFixed(2);
    document.getElementById('processing-fee').textContent = processingFee.toFixed(2);
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function calculateProcessingFee(amount) {
    // Stripe's fee is 2.9% + $0.30
    return (amount * 0.029) + 0.30;
}

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        amountBtns.forEach(b => {
            b.classList.remove('border-blue-600', 'bg-blue-50');
            b.classList.add('border-gray-200');
        });
        btn.classList.add('border-blue-600', 'bg-blue-50');
        btn.classList.remove('border-gray-200');
        
        const amount = parseInt(btn.textContent.replace('$', ''));
        updateAmount(amount);
        customAmountInput.value = '';
    });
});

customAmountInput.addEventListener('input', () => {
    amountBtns.forEach(btn => {
        btn.classList.remove('border-blue-600', 'bg-blue-50');
        btn.classList.add('border-gray-200');
    });
    
    const amount = parseFloat(customAmountInput.value) || 0;
    updateAmount(amount);
});

// Handle form submission
const form = document.getElementById('donation-form');
const submitButton = document.getElementById('submit-donation');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    if (selectedAmount <= 0) {
        alert('Please select a donation amount');
        return;
    }
    
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    try {
        // Create payment intent on the server
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: selectedAmount * 100, // Convert to cents
                currency: 'usd',
            }),
        });
        
        const data = await response.json();
        
        // Confirm the payment
        const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: form.querySelector('input[type="text"]').value,
                    email: form.querySelector('input[type="email"]').value,
                },
            },
        });
        
        if (result.error) {
            // Handle error
            alert(result.error.message);
        } else {
            // Payment successful
            window.location.href = '/donation-success';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Complete Donation';
    }
}); 