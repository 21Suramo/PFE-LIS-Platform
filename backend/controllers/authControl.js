// controllers/authControl.js
const User = require('../modules/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
   
    const { name, email, password, role, avatar, speciality, link1, link2 } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password.'});
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role && User.schema.path('role').enumValues.includes(role) ? role : undefined; // Default from schema if invalid/not provided

    const user = await User.create({
      nom: name,
      email,
      motDePasseHash: hashedPassword,
      role: userRole,
      avatar,
      speciality,
      link1,
      link2
    });

    const tokenPayload = { 
        id: user._id, 
        role: user.role,
        nom: user.nom, 
        avatar: user.avatar
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
        token,
        user: {
            _id: user._id,
            nom: user.nom,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            speciality: user.speciality,
            link1: user.link1,
            link2: user.link2
        }
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.motDePasseHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const tokenPayload = { 
        id: user._id, 
        role: user.role,
        nom: user.nom, // Use 'nom'
        avatar: user.avatar
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
        token,
        user: {
            _id: user._id,
            nom: user.nom,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            speciality: user.speciality,
            link1: user.link1,
            link2: user.link2
        }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // In a real app, send email with reset link or token
    res.json({ message: 'Password reset instructions sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Email, old password, new password and confirmation are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.motDePasseHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    user.motDePasseHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};