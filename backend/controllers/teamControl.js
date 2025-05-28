const Team = require('../modules/team');
const User = require('../modules/user');
const path = require("path");

// Create a team
exports.createTeam = async (req, res) => {
  try {
    const { name, description, objectifs, specialite, membres, article, leader } = req.body;

    if (!name || !description || !specialite || !leader) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newTeam = new Team({
      name,
      description,
      objectifs,
      specialite,
      leader,
      membres: JSON.parse(membres || "[]"),
      article: article || null,
      imageUrl,
    });

    await newTeam.save();

    const populated = await Team.findById(newTeam._id)
      .populate('leader', 'nom email avatar speciality')
      .populate('membres', 'nom email avatar speciality')
      .populate('article', 'title');

    res.status(201).json({ message: "Team created!", team: populated });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Failed to create team", error: error.message });
  }
};


// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'nom email avatar speciality')
      .populate('membres', 'nom email avatar speciality')
      .populate('article', 'title');

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get teams', error: error.message });
  }
};

// Get team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'nom email avatar speciality')
      .populate('membres', 'nom email avatar speciality')
      .populate('article', 'title');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get team', error: error.message });
  }
};

// Update team
exports.updateTeam = async (req, res) => {
  try {
    const {
      name,
      description,
      objectifs,
      specialite,
      membres,
      article,
      leader,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = {
      name,
      description,
      objectifs,
      specialite,
      membres: membres ? JSON.parse(membres) : [],
      article,
      leader,
    };

    if (imageUrl) updateFields.imageUrl = imageUrl;

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    )
      .populate('leader', 'nom email avatar speciality')
      .populate('membres', 'nom email avatar speciality')
      .populate('article', 'title');

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found for update.' });
    }

    res.status(200).json(updatedTeam);

  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ message: 'Failed to update team', error: error.message });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found for deletion.' });
    }
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete team', error: error.message });
  }
};
