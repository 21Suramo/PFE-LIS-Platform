const Lab = require('../modules/laboratoire'); // Import the Lab model


// Create Lab
exports.createLab = async (req, res) => {
  try {
    const newLab = new Lab(req.body);
    await newLab.save();
    res.status(201).json({ message: 'Lab created successfully!', lab: newLab });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Lab', error: error.message });
  }
};

// Get all Labs
exports.getAllLabs = async (req, res) => {
  try {
    const Labs = await Lab.find();
    res.status(200).json(Labs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Labs', error: error.message });
  }
};

// Get single Lab by ID
exports.getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }
    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Lab', error: error.message });
  }
};


// Update Lab
exports.updateLab = async (req, res) => {
  try {
    const updatedLab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLab);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Lab', error: error.message });
  }
};

// Delete Lab
exports.deleteLab = async (req, res) => {
  try {
    await Lab.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Lab', error: error.message });
  }
};
