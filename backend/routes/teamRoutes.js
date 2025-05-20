const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create team (protected)
router.post('/', authMiddleware, teamController.createTeam);

// Get all teams (public)
router.get('/', teamController.getAllTeams);

// Get single team
router.get('/:id', teamController.getTeamById);

// Update team (protected)
router.put('/:id', authMiddleware, teamController.updateTeam);

// Delete team (protected)
router.delete('/:id', authMiddleware, teamController.deleteTeam);

module.exports = router;
// This code defines the routes for handling team-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting teams. The routes are protected by authentication middleware for creating, updating, and deleting teams, while retrieving all teams is public.