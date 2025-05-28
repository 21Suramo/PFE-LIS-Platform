// teamRoutes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamControl');
const authMiddleware = require('../middlewares/authMidleware');
const upload = require('../middlewares/upload');

// Create team with image
router.post('/', authMiddleware, upload.single('image'), teamController.createTeam);

// Update team
router.put('/:id', authMiddleware, upload.single('image'), teamController.updateTeam);

// Get all teams
router.get('/', teamController.getAllTeams);

// Get one team
router.get('/:id', teamController.getTeamById);

// Delete
router.delete('/:id', authMiddleware, teamController.deleteTeam);

module.exports = router;
