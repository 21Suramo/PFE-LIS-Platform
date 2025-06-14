const Team = require('../modules/team');
const User = require('../modules/user');
const path = require("path");

// Create a team
exports.createTeam = async (req, res) => {
  try {
    if (!['RESPONSABLE', 'DIRECTEUR'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { name, description, objectifs, specialite, membres, article, leader } = req.body;

    if (!name || !description || !specialite || !leader) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const parsedMembers = JSON.parse(membres || "[]");
    if (leader && !parsedMembers.includes(leader)) parsedMembers.push(leader);

    const newTeam = new Team({
      name,
      description,
      objectifs,
      specialite,
      leader,
      membres: parsedMembers,
      article: article || null,
      imageUrl,
    });

    await newTeam.save();

    const populated = await Team.findById(newTeam._id)
      .populate('leader', 'nom email avatar speciality role')
      .populate('membres', 'nom email avatar speciality role')
      .populate('article', 'title')
      .populate('articles', 'title statut createdAt resume');

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
      .populate('leader', 'nom email avatar speciality role')
      .populate('membres', 'nom email avatar speciality role')
      .populate('article', 'title')
      .populate('articles', 'title statut createdAt resume');

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get teams', error: error.message });
  }
};

// Get team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'nom email avatar speciality role')
      .populate('membres', 'nom email avatar speciality role')
      .populate('article', 'title')
      .populate('articles', 'title statut createdAt resume');

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

    const parsedMembers = membres ? JSON.parse(membres) : [];
    if (leader && !parsedMembers.includes(leader)) parsedMembers.push(leader);

    const updateFields = {
      name,
      description,
      objectifs,
      specialite,
      membres: parsedMembers,
      article,
      leader,
    };

    if (imageUrl) updateFields.imageUrl = imageUrl;

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    )
      .populate('leader', 'nom email avatar speciality role')
      .populate('membres', 'nom email avatar speciality role')
      .populate('article', 'title')
      .populate('articles', 'title statut createdAt resume');

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

// Add a member to a team
exports.addMember = async (req, res) => {
  try {
    if (!['RESPONSABLE', 'DIRECTEUR'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' });
    }

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (!team.membres.includes(userId)) {
      team.membres.push(userId);
      await team.save();
    }

    const populatedTeam = await Team.findById(req.params.id)
      .populate('leader', 'nom email avatar speciality role')
      .populate('membres', 'nom email avatar speciality role')
      .populate('article', 'title')
      .populate('articles', 'title statut createdAt resume');

    res.status(200).json(populatedTeam);
  } catch (error) {
    console.error('Error adding member to team:', error);
    res.status(500).json({ message: 'Failed to add member', error: error.message });
  }
};

// Remove a member from a team
exports.removeMember = async (req, res) => {
  try {
    if (!['RESPONSABLE', 'DIRECTEUR'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id, userId } = req.params;
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    team.membres = team.membres.filter((m) => m.toString() !== userId);
    await team.save();

    const populatedTeam = await Team.findById(id)
      .populate('leader', 'nom email avatar speciality role')
      .populate('membres', 'nom email avatar speciality role')
      .populate('article', 'title')
      .populate('articles', 'title statut createdAt resume');

    res.status(200).json(populatedTeam);
  } catch (error) {
    console.error('Error removing member from team:', error);
    res.status(500).json({ message: 'Failed to remove member', error: error.message });
  }
};