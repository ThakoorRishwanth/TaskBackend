const express = require('express');
const { registerUser, authUser, refreshToken, logout } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', authUser);

// Refresh Token Route
router.post('/refresh-token', refreshToken);

// Logout Route
router.post('/logout', logout);

module.exports = router;
