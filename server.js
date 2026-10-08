const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/', require('./routes/index.js'));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Campus Study Hub API is running'
    });
});

const PORT = process.env.PORT || 8080;

// Start server only when running server.js directly
if (require.main === module) {
    connectDB();

    app.listen(PORT, () => {
        console.log(`Campus Study Hub API running on port ${PORT}`);
    });
}

module.exports = app;