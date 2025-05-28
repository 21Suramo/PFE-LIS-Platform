// controllers/laboControl.js
const Lab = require('../modules/laboratoire'); // Ensure path is correct

// Create Lab
exports.createLab = async (req, res) => {
  try {
    
    const { nom, description, dateCreation } = req.body;

    if (!nom || !description) { 
        return res.status(400).json({ message: "Missing required fields: nom, description."});
    }
    const newLabData = { nom, description, dateCreation };

    const newLab = new Lab(newLabData);
    await newLab.save();
    res.status(201).json({ message: 'Lab created successfully!', lab: newLab });
  } catch (error) {
    console.error("Error creating lab:", error);
    if (error.code === 11000) { 
        return res.status(400).json({ message: 'Lab with this nom already exists.' });
    }
    res.status(500).json({ message: 'Failed to create Lab', error: error.message });
  }
};

// Get all Labs
exports.getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json(labs);
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
    // Expects req.body to match schema: nom, description (corrected)
    const updatedLab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLab) {
        return res.status(404).json({ message: 'Lab not found for update.' });
    }
    res.status(200).json(updatedLab);
  } catch (error) {
    console.error("Error updating lab:", error);
    res.status(500).json({ message: 'Failed to update Lab', error: error.message });
  }
};

// Delete Lab
exports.deleteLab = async (req, res) => {
  try {
    const deletedLab = await Lab.findByIdAndDelete(req.params.id);
     if (!deletedLab) {
        return res.status(404).json({ message: 'Lab not found for deletion.' });
    }
    res.status(200).json({ message: 'Lab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Lab', error: error.message });
  }
};