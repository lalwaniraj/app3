// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
    res.send('Hello from Node.js app setup by rajkumar!');
});

// API route
app.get('/api', (req, res) => {
    res.json({ message: 'This is a simple API response.' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
