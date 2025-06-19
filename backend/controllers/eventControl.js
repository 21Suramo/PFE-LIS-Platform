const Event = require('../modules/event');

// Create event with uploaded image
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      eventType,
      format,
      streamingUrl,
      origine,
    } = req.body;

    // Required fields validation
    if (!title || !description || !date || !eventType || !format || !origine) {
      return res
        .status(400)
        .json({ message: 'Missing required fields for event creation.' });
    }

     // Get uploaded file paths if available
     const imageFile = req.files?.image?.[0];
     const pdfFile = req.files?.pdf?.[0];
     const image = imageFile ? `/uploads/${imageFile.filename}` : "";
     const pdf = pdfFile ? `/uploads/${pdfFile.filename}` : undefined;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      eventType,
      format,
      streamingUrl,
      origine,
      image,
      pdf,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully!', event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: 'Failed to create event', error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get events', error: error.message });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get event', error: error.message });
  }
};

// Update event (does not handle new file upload here)
exports.updateEvent = async (req, res) => {
  try {
    const updateFields = { ...req.body };

    // If new files are uploaded
    if (req.files?.image?.[0]) {
      updateFields.image = `/uploads/${req.files.image[0].filename}`;
    }
    if (req.files?.pdf?.[0]) {
      updateFields.pdf = `/uploads/${req.files.pdf[0].filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found for update' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
};


// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found for deletion' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
};
