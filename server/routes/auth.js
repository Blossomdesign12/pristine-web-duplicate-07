
const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user
router.get('/me', authenticate, getCurrentUser);

module.exports = router;
