
const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// Start GitHub login
router.get(
    '/github',
    passport.authenticate('github', {
        scope: ['user:email']
    })
);

// GitHub redirects here after authentication
router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/auth/failed'
    }),
    (req, res) => {
        res.status(200).json({
            message: 'GitHub authentication successful',
            user: req.user
        });
    }
);

// Authentication failure
router.get('/failed', (req, res) => {
    res.status(401).json({
        message: 'GitHub authentication failed'
    });
});

// Check current login status
router.get('/status', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            authenticated: false,
            message: 'Not authenticated'
        });
    }

    res.status(200).json({
        authenticated: true,
        user: req.user
    });
});

// Logout
router.post('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        req.session.destroy((sessionError) => {
            if (sessionError) {
                return next(sessionError);
            }

            res.clearCookie('connect.sid');

            res.status(200).json({
                message: 'Logged out successfully'
            });
        });
    });
});

module.exports = router;