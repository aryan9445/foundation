// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu hidden md:hidden fixed inset-0 bg-white z-40';
    
    const menuContent = `
        <div class="p-4">
            <div class="flex justify-between items-center mb-8">
                <a href="/" class="text-2xl font-bold text-blue-600">Paws of Hope</a>
                <button class="mobile-menu-close p-2">
                    <i class="fas fa-times text-gray-600"></i>
                </button>
            </div>
            <nav class="space-y-4">
                <a href="/" class="block text-gray-700 hover:text-blue-600 px-3 py-2">Home</a>
                <a href="/about" class="block text-gray-700 hover:text-blue-600 px-3 py-2">About</a>
                <a href="/campaigns" class="block text-gray-700 hover:text-blue-600 px-3 py-2">Campaigns</a>
                <a href="/donate" class="block text-gray-700 hover:text-blue-600 px-3 py-2">Donate</a>
                <a href="/volunteer" class="block text-gray-700 hover:text-blue-600 px-3 py-2">Volunteer</a>
                <a href="/contact" class="block text-gray-700 hover:text-blue-600 px-3 py-2">Contact</a>
            </nav>
        </div>
    `;
    
    mobileMenu.innerHTML = menuContent;
    document.body.appendChild(mobileMenu);
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    const closeButton = mobileMenu.querySelector('.mobile-menu-close');
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 