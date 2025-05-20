const express = require('express');
const router = express.Router();
const axerechController = require('../controllers/axerechControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create axerech (protected)
router.post('/', authMiddleware, axerechController.createAxerech);

// Get all axerechs (public)
router.get('/', axerechController.getAllAxerech);

// Get single axerech (public)
router.get('/:id', axerechController.getAxerechById);

// Update axerech (protected)
router.put('/:id', authMiddleware, axerechController.updateAxerech);

// Delete axerech (protected)
router.delete('/:id', authMiddleware, axerechController.deleteAxerech);

module.exports = router;
// This code defines the routes for handling axerech-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting axerechs.
