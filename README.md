# Paws of Hope - Dog Rescue Foundation Website

A modern, responsive website for a non-profit foundation focused on rescuing and supporting stray dogs.

## Features

- Responsive design using Tailwind CSS
- Secure payment processing with Stripe
- Interactive donation system
- Mobile-friendly navigation
- Contact form
- Newsletter subscription
- Social media integration

## Tech Stack

- Frontend: HTML, CSS (Tailwind CSS), JavaScript
- Backend: Node.js with Express.js
- Payment Processing: Stripe
- Icons: Font Awesome
- Animations: Custom CSS animations

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Stripe account for payment processing

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd dog-rescue-foundation
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NODE_ENV=development
```

4. Replace the Stripe keys in `public/js/donate.js` with your publishable key:
```javascript
const stripe = Stripe('your_publishable_key');
```

5. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## Project Structure

```
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── donate.js
│   ├── images/
│   └── *.html
├── routes/
│   └── payment.js
├── server.js
├── package.json
└── README.md
```

## Development

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Stripe for secure payment processing
- Font Awesome for the icons
- All contributors and supporters of the project 