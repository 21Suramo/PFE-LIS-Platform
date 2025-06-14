// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs
const User = require('./modules/user'); // Import your User model

require('events').EventEmitter.defaultMaxListeners = 20;
require('dotenv').config();

app.use(cors());
app.use(express.json());



// --- Function to create default users ---
/*
const createDefaultDirector = async () => {
  const existing = await User.findOne({ email: process.env.DIRECTOR_EMAIL });
  if (existing) return;

  const hashedPassword = await bcrypt.hash('ab123', 10);

  await User.create({
    nom: 'Fatiha Hasna CHAMLAL',
    email: 'hasna.chamlal@lis.ma',
    motDePasseHash: hashedPassword, 
    role: 'DIRECTEUR',
    speciality: 'Ph.D., Statistics, Data Analysis, Data Science, Mohammed V University, Rabat Morocco.',      
    avatar: '/uploads/chamlal.png',
  });

  console.log('Default DIRECTEUR user created');
};

*/
// --- End of function ---

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://abdelouahidaitsi:8XODIpvmPhoFqNQV@cluster0.wfdgilz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB connected');
    // Call the function to create the default Director account after successful connection
    //  createDefaultDirector();
    
  })
  .catch(
    (err) => console.log('MongoDB connection error:', err)
  );

// Routes
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
// app.use('/api/conferences', require('./routes/conferRountes')); // This was removed in previous steps
app.use('/api/events', require('./routes/eventsRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/axerecherches', require('./routes/axrechRoutes'));
app.use('/api/laboratoires', require('./routes/laboRoutes'));
app.use('/api/thess', require('./routes/thesRoutes'));
app.use('/api/actualites', require('./routes/actualiteRoutes')); // Ensure this line exists if you added actualites
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory


app.listen(process.env.PORT || 3000, () => { // Use environment variable for port
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});