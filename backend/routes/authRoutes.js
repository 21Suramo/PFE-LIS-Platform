const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControl');

// Register (for testing maybe)
router.post('/register', authController.registerUser);

// Login
router.post('/login', authController.loginUser); 

// Reset password
router.post('/reset-password', authController.resetPassword);

// Change password
router.post('/change-password', authController.changePassword);


module.exports = router;
// This code defines the authentication routes for user registration and login in an Express application. It uses a controller to handle the logic for each route. The routes include registering a new user and logging in an existing user.