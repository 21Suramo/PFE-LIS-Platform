const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');   
require('events').EventEmitter.defaultMaxListeners = 20;

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your connection string)
mongoose.connect("mongodb+srv://abdelouahidaitsi:8XODIpvmPhoFqNQV@cluster0.wfdgilz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() =>{console.log('MongoDB connected')} )
  .catch(
    (err) => console.log('MongoDB connection error:', err)
  );

// Routes
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/conferences', require('./routes/conferRountes'));
app.use('/api/events', require('./routes/eventsRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/axerecherches', require('./routes/axrechRoutes'));
app.use('/api/laboratoires', require('./routes/laboRoutes'));
app.use('/api/thess', require('./routes/thesRoutes'));


app.listen(3000,  () => {
   console.log('Server running on http://localhost:3000');

});


























//-------------------------------------------------------------------------------------------------------------------------------------------------


// Define the Article model (assuming you have a separate file for it)
      // const Article = require('./modules/article.js');


// Serve static files from "public" folder
  // app.use(express.static('public'));

// Dummy user (for testing)
// const anas = {
//   email: 'anas@example.com',
//   password: '123456'
// };

// // POST /login route
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//     // Check if email and password match
//   if (email === anas.email && password === anas.password) {
//     res.status(200).json({ message: 'Login successful!' });
//   } else {
//     res.status(401).json({ message: 'Invalid email or password.' });
//   }

//   });

// POST /articles route to create a new article
  // app.post('/articles', async (req, res) => {
  //   try {
  //     const newArticle = new Article();
  //    newArticle.title = "Test1";
  //   newArticle.content = "Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla";
  //      newArticle.author = "Abdelouahid ";
  //      newArticle.createdAt = new Date(); // Set the createdAt field to the current date
  //     await newArticle.save();

  //     res.status(200).json({ message: 'Article created successfully!' });
  //   } catch (error) {
  //      // console.error(error.message);
  //     res.status(500).json({ message: 'Something went wrong', error : error.message });
  //   }
  // });











