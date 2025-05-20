const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the thes schema
// This schema defines the structure of the thes documents in the MongoDB collection

const thesSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  abstract: { type: String, required: true },
  dateSoutenance: Date,
  equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jury: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
// Create the thes model using the schema
// The model is a constructor function that creates instances of the User schema
const Thes = mongoose.model('Thes', thesSchema);


// Export the User model so it can be used in other files
// This allows other files to import and use the thes model for database operations
module.exports = Thes;
