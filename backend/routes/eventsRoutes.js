const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create event (protected)
router.post('/', authMiddleware, eventController.createEvent);

// Get all events (public)
router.get('/', eventController.getAllEvents);

// Get single event
router.get('/:id', eventController.getEventById);

// Update event (protected)
router.put('/:id', authMiddleware, eventController.updateEvent);

// Delete event (protected)
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
// This code defines the routes for handling event-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting events.
// The routes are protected by authentication middleware for creating, updating, and deleting events, while retrieving all events is public.