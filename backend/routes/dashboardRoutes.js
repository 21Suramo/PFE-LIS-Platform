const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardControl');

router.get('/', dashboardController.getStats);

module.exports = router;