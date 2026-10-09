
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const connectDB = require('./config/db.js');

dotenv.config();

const passport = require('./config/passport');

const app = express();

// Needed when deployed behind Render's HTTPS proxy
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Middleware
app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

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

if (require.main === module) {
    connectDB();

    app.listen(PORT, () => {
        console.log(`Campus Study Hub API running on port ${PORT}`);
    });
}

module.exports = app;