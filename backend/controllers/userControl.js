const User = require('../modules/user'); // Import the User model
const bcrypt = require('bcryptjs');

exports.createTeamLeader = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'teamLeader'
    });

    res.status(201).json({ message: 'Team leader created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create team leader', error: err.message });
  }
};
