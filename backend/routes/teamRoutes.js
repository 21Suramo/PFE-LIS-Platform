// teamRoutes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamControl');
const authMiddleware = require('../middlewares/authMidleware');

const requireLeader = (req, res, next) => {
    if (['RESPONSABLE', 'DIRECTEUR'].includes(req.user.role)) return next();
    return res.status(403).json({ message: 'Access denied' });
  };

const upload = require('../middlewares/upload');

// Create team with image
// router.post('/', authMiddleware, upload.single('image'), teamController.createTeam);
router.post('/', authMiddleware, requireLeader, upload.single('image'), teamController.createTeam);

// Update team
router.put('/:id', authMiddleware, upload.single('image'), teamController.updateTeam);

// Add member to team
// router.post('/:id/members', authMiddleware, teamController.addMember);
router.post('/:id/members', authMiddleware, requireLeader, teamController.addMember);

// Remove member from team
router.delete('/:id/members/:userId', authMiddleware, requireLeader, teamController.removeMember);


// Get all teams
router.get('/', teamController.getAllTeams);

// Get one team
router.get('/:id', teamController.getTeamById);

// Delete
router.delete('/:id', authMiddleware, teamController.deleteTeam);

module.exports = router;
