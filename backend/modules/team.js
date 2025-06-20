const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Team schema
// This schema defines the structure of the Team documents in the MongoDB collection

const teamSchema = new mongoose.Schema({
  name : { type: String, required: true },
  description: { type: String, required: true },
  objectifs: { type: String, required: false },
  specialite: { type: String, required: true }, 
  imageUrl: { type: String, required: false }, 
  dateCreation: { type: Date, default: Date.now },
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});


// Create the Team model using the schema
// The model is a constructor function that creates instances of the Team schema
const Team = mongoose.model('Team', teamSchema);


// Export the Team model so it can be used in other files
// This allows other files to import and use the Team model for database operations
module.exports = Team;