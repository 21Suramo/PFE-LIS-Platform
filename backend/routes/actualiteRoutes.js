const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // for file handling
const authMiddleware = require('../middlewares/authMidleware');
const actualiteController = require('../controllers/actualitControl');

// Create actualité (with image upload)
router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  actualiteController.createActualite
);

// Get all
router.get('/', actualiteController.getAllActualites);

// Get one
router.get('/:id', actualiteController.getActualiteById);

// Update (with image upload)
router.put(
  '/:id',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  actualiteController.updateActualite
);

// Delete
router.delete('/:id', authMiddleware, actualiteController.deleteActualite);

module.exports = router;
