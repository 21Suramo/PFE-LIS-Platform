const Conference = require('../modules/confer'); // Import the Conference model


// Create conference
exports.createConference = async (req, res) => {
  try {
    const newConference = new Conference(req.body);
    await newConference.save();
    res.status(201).json({ message: 'Conference created successfully!', conference: newConference });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create conference', error: error.message });
  }
};

// Get all conferences
exports.getAllConferences = async (req, res) => {
  try {
    const conferences = await Conference.find();// find all conferences
    res.status(200).json(conferences);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get conferences', error: error.message });
  }
};

// Get single conference by ID
exports.getConferenceById = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);
    if (!conference) {
      return res.status(404).json({ message: 'Conference not found' });
    }
    res.status(200).json(conference);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get conference', error: error.message });
  }
};


// Update conference
exports.updateConference = async (req, res) => {
  try {
    const updatedConference = await Conference.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedConference);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update conference', error: error.message });
  }
};

// Delete conference
exports.deleteConference = async (req, res) => {
  try {
    await Conference.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Conference deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete conference', error: error.message });
  }
};
