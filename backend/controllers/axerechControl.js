const AxeRecherche = require('../modules/axeRecherche'); // Import the axerecherche model

// Create new AxeRecherche
exports.createAxerech = async (req, res) => {
  try {
    const newAxerecherche = new AxeRecherche(req.body);
    await newAxerecherche.save();
    res.status(201).json({ message: 'Axerecherche created successfully!', Axerecherche: newAxerecherche });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Axerecherche', error: error.message });
  }
};

// Get all Axerecherches
exports.getAllAxerech = async (req, res) => {
  try {
    const axerecherches = await AxeRecherche.find().populate('equipes');// find all Axerecherches
    res.status(200).json(axerecherches);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Axerecherches', error: error.message });
  }
};

// Update Axerecherche
exports.updateAxerech = async (req, res) => {
  try {
    const updatedaxerecherche = await AxeRecherche.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ID from the URL like /Axerecherches/:id , new body, save
    res.status(200).json(updatedaxerecherche);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Axerecherche', error: error.message });
  }
};

// Delete Axerecherche
exports.deleteAxerech = async (req, res) => {
  try {
    await AxeRecherche.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Axerecherche deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Axerecherche', error: error.message });
  }
};

// Get single Axerecherche by ID 
exports.getAxerechById = async (req, res) => {
  try {
    const axerecherche = await AxeRecherche.findById(req.params.id).populate('equipes'); // Populate the 'equipes' field with the corresponding data
    if (!axerecherche) {
      return res.status(404).json({ message: 'Axerecherche not found' });
    }
    res.status(200).json(axerecherche);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Axerecherche', error: error.message });
  }
};