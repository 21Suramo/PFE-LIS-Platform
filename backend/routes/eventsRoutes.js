const express = require('express');
const router = express.Router();

const upload = require("../middlewares/upload");
const eventController = require('../controllers/eventControl');
const authMiddleware = require('../middlewares/authMidleware');

//  Create event (protected & supports image and pdf upload)
router.post(
    '/',
    authMiddleware,
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ]),
    eventController.createEvent
  );

//  Get all events (public)
router.get('/', eventController.getAllEvents);

//  Get single event by ID
router.get('/:id', eventController.getEventById);

//  Update event (protected & supports file upload)
router.put(
    '/:id',
    authMiddleware,
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ]),
    eventController.updateEvent
  );


//  Delete event (protected)
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
