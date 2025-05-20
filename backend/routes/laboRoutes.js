const express = require('express');
const router = express.Router();
const laboController = require('../controllers/laboControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create labo (protected)
router.post('/', authMiddleware, laboController.createLab);

// Get all labos (public)
router.get('/', laboController.getAllLabs);

// Get single labo
router.get('/:id', laboController.getLabById);

// Update labo (protected)
router.put('/:id', authMiddleware, laboController.updateLab);

// Delete labo (protected)
router.delete('/:id', authMiddleware, laboController.deleteLab);

module.exports = router;
// This code defines the routes for handling labo-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting labos. The routes are protected by authentication middleware for creating, updating, and deleting labos, while retrieving all labos is public.