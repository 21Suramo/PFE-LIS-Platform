const Thes = require('../modules/TheseSoutnu'); // Import the Thes model

// Create new Thes
exports.createthes = async (req, res) => {
  try {
    const newThes = new Thes(req.body);
    await newThes.save();
    res.status(201).json({ message: 'Thes created successfully!', thes: newThes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Thes', error: error.message });
  }
};

// Get all Thess
exports.getAllthess = async (req, res) => {
  try {
    const Thess = await Thes.find().populate('equipe' , 'name') // populate the equipe field with the name of the team
  .populate('auteur' , 'nom') 
  .populate('jury' , 'nom');// find all Thess
    res.status(200).json(Thess);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Thess', error: error.message });
  }
};

// Update Thes
exports.updatethes = async (req, res) => {
  try {
    const updatedThes = await Thes.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ID from the URL like /Thess/:id , new body, save
    res.status(200).json(updatedThes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Thes', error: error.message });
  }
};

// Delete Thes
exports.deletethes = async (req, res) => {
  try {
    await Thes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Thes deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Thes', error: error.message });
  }
};

// Get single Thes by ID 
exports.getthesById = async (req, res) => {
  try {
    const thes = await Thes.findById(req.params.id).populate('equipe' , 'name')
  .populate('auteur' , 'nom')
  .populate('jury' , 'nom');
    if (!thes) {
      return res.status(404).json({ message: 'Thes not found' });
    }
    res.status(200).json(thes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Thes', error: error.message });
  }
};