const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const protect = require('../middlewares/authMidleware');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const User = require('../modules/user'); // <-- add this if not present

// ✅ New route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'nom email role avatar speciality');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des utilisateurs', error: error.message });
  }
});

// ✅ Existing route: only super admin can create team leaders
router.post('/create-team-leader', protect, isSuperAdmin, userController.createTeamLeader);

module.exports = router;
