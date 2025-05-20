const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Conferens schema
// This schema defines the structure of the Conferens documents in the MongoDB collection

const conferSchema = new mongoose.Schema({
  name: { type: String, required: true }, // name of the Conferens, required field that verifies the name value 
  location: { type: String, required: false },
  date: { type: Date, required: false }, 
  description : { type: String, required: true },
    image: { type: String, required: false }, // URL of the image associated with the Conferens
  createdAt: { type: Date, default: Date.now }// Date when the Conferens was created, defaults to the current date
});

// Create the Conferens model using the schema
// The model is a constructor function that creates instances of the Conferens schema
const Conferens = mongoose.model('Conferens', conferSchema);


// Export the Conferens model so it can be used in other files
// This allows other files to import and use the Conferens model for database operations
module.exports = Conferens;