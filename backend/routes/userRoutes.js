const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const protect = require('../middlewares/authMidleware');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const User = require('../modules/user');
const upload = require('../middlewares/upload');


router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'nom email role avatar speciality');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des utilisateurs', error: error.message });
  }
});

router.post('/create', protect, isSuperAdmin, upload.single('avatar'), userController.createUser);


router.post('/create-team-leader', protect, isSuperAdmin, upload.single('avatar'), userController.createTeamLeader);

// Routes pour consulter, mettre à jour et supprimer un utilisateur
router.get('/:id', userController.getUserById);
router.put('/:id', protect, isSuperAdmin, upload.single('avatar'), userController.updateUser);
router.delete('/:id', protect, isSuperAdmin, userController.deleteUser);


module.exports = router;
