const User = require('../modules/user');
const bcrypt = require('bcryptjs');


exports.createTeamLeader = async (req, res) => {
  try {
    const { name, email, password, avatar, speciality, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password.'});
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const userRole = role && User.schema.path('role').enumValues.includes(role) ? role : 'RESPONSABLE';

    const newUser = await User.create({
      nom: name, 
      email,
      motDePasseHash: hashedPassword,
      role: userRole, 
      avatar,    
      speciality 
    });

    const userResponse = newUser.toObject();
    delete userResponse.motDePasseHash;

    res.status(201).json({ message: `User with role ${userRole} created successfully`, user: userResponse });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
};


// Get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-motDePasseHash'); // Exclude password hash
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
};

// Get a single user by ID

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-motDePasseHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ message: 'Failed to get user', error: error.message });
  }
};

// Update user by ID

exports.updateUser = async (req, res) => {
  try {
    const { nom, email, role, avatar, speciality, password } = req.body;
    const userIdToUpdate = req.params.id;


    const user = await User.findById(userIdToUpdate);
    if (!user) {
      return res.status(404).json({ message: 'User not found for update' });
    }

    // Prepare updates
    const updateData = {};
    if (nom) updateData.nom = nom;
    if (email) updateData.email = email; // Consider email uniqueness validation if changed
    if (avatar) updateData.avatar = avatar;
    if (speciality) updateData.speciality = speciality;

    // Restrict role changes to admins
    if (role && (req.user.role === 'superAdmin' || req.user.role === 'DIRECTEUR')) {
      if (User.schema.path('role').enumValues.includes(role)) {
        updateData.role = role;
      } else {
        return res.status(400).json({ message: 'Invalid role specified.' });
      }
    } else if (role && req.user.id === userIdToUpdate) {
      // Prevent users from changing their own role
      return res.status(403).json({ message: 'You are not authorized to change your own role.' });
    }


    // Handle password update separately and carefully
    if (password) {
      if (password.length < 6) { // Example validation
          return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
      }
      const salt = await bcrypt.genSalt(10);
      updateData.motDePasseHash = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userIdToUpdate, { $set: updateData }, { new: true, runValidators: true }).select('-motDePasseHash');
    
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ message: 'Email already in use.' });
    }
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found for deletion' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};