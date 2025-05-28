const express = require('express');
const router = express.Router();

const upload = require("../middlewares/upload");
const eventController = require('../controllers/eventControl');
const authMiddleware = require('../middlewares/authMidleware');

//  Create event (protected & supports image upload)
router.post('/', authMiddleware, upload.single('image'), eventController.createEvent);

//  Get all events (public)
router.get('/', eventController.getAllEvents);

//  Get single event by ID
router.get('/:id', eventController.getEventById);

//  Update event (protected)
// Update event (protected & supports file upload)
router.put('/:id', authMiddleware, upload.single('image'), eventController.updateEvent);


//  Delete event (protected)
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
