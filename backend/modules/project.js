const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Project schema
// This schema defines the structure of the Project documents in the MongoDB collection

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  equipe: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Team',
  required: true
},

 // Related to Team
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  createdAt: { type: Date, default: Date.now }
});

// Create the Project model using the schema
// The model is a constructor function that creates instances of the Project schema
const Project = mongoose.model('Project', projectSchema);


// Export the Project model so it can be used in other files
// This allows other files to import and use the Project model for database operations
module.exports = Project;