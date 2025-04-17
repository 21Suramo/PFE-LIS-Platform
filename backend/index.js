const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');   

app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static('public'));

// Dummy user (for testing)
const anas = {
  email: 'anas@example.com',
  password: '123456'
};

// POST /login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

    // Check if email and password match
  if (email === anas.email && password === anas.password) {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid email or password.' });
  }

  });

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/login.html');

});