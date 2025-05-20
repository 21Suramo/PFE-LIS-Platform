const Team = require('../modules/team'); // Import the Team model
const User = require('../modules/user'); // Import the User model


// Create team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Get the user ID from the JWT (set by the auth middleware)
    const leaderId = req.user.id;
    const leader = req.user;

  
    const newTeam = new Team({
      name,
      description,
      leader: leaderId ,
      leaderName: leader.name ,
    });

    await newTeam.save();

    res.status(201).json({ message: 'Team created successfully!', team: newTeam });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team', error: error.message });
  }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('equipe'); // Populate the 'equipe' field with the corresponding data
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get teams', error: error.message });
  }
};

// Get single team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('equipe'); // Populate the leader field with user details
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
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update team', error: error.message });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete team', error: error.message });
  }
};
