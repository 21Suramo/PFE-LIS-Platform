const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the User schema
// This schema defines the structure of the User documents in the MongoDB collection

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasseHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['DIRECTEUR', 'RESPONSABLE', 'MEMBRE', 'DOCTORANT'],
    default: 'MEMBRE'
  },
  avatar: { type: String, required: false },
  speciality: { type: String, required: false },
  link1: { type: String, required: false },
  link2: { type: String, required: false }
});

// Create the User model using the schema
// The model is a constructor function that creates instances of the User schema
const User = mongoose.model('User', userSchema);


// Export the User model so it can be used in other files
// This allows other files to import and use the User model for database operations
module.exports = User;