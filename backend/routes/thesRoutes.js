const express = require('express');
const router = express.Router();
const thesController = require('../controllers/thesControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create thes (protected)
router.post('/', authMiddleware, thesController.createthes);

// Get all thess (public)
router.get('/', thesController.getAllthess);

// Get single thes
router.get('/:id', thesController.getthesById);

// Update thes (protected)
router.put('/:id', authMiddleware, thesController.updatethes);

// Delete thes (protected)
router.delete('/:id', authMiddleware, thesController.deletethes);

module.exports = router;
// This code defines the routes for handling thes-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting thess. The routes are protected by authentication middleware for creating, updating, and deleting thess, while retrieving all thess is public.