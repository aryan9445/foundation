require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payment');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Payment routes (needs raw body for webhook)
app.use('/api', paymentRoutes);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/campaigns', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'campaigns.html'));
});

app.get('/donate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donate.html'));
});

app.get('/volunteer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'volunteer.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/donation-success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donation-success.html'));
});

// API Routes
app.post('/api/contact', (req, res) => {
    // TODO: Implement contact form submission
    res.json({ message: 'Contact form submission received' });
});

app.post('/api/donate', (req, res) => {
    // TODO: Implement donation processing
    res.json({ message: 'Donation processing endpoint' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 