const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create conference (protected)
router.post('/', authMiddleware, conferenceController.createConference);

// Get all conferences (public)
router.get('/', conferenceController.getAllConferences);

// Get single conference
router.get('/:id', conferenceController.getConferenceById);

// Update conference (protected)
router.put('/:id', authMiddleware, conferenceController.updateConference);

// Delete conference (protected)
router.delete('/:id', authMiddleware, conferenceController.deleteConference);

module.exports = router;
// This code defines the routes for handling conference-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting conferences. The routes are protected by authentication middleware for creating, updating, and deleting conferences, while retrieving all conferences is public.