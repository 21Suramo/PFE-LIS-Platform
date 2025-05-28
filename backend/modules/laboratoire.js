const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Lab schema
// This schema defines the structure of the Lab documents in the MongoDB collection

const labSchema = new mongoose.Schema({
  nom: { type: String, required: true }, // Title of the Lab, required field that verifies the title value 
  discription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },// Date when the Lab was created, defaults to the current date
});



// Create the Lab model using the schema
// The model is a constructor function that creates instances of the Lab schema
const Lab = mongoose.model('Lab', labSchema);


// Export the Lab model so it can be used in other files
// This allows other files to import and use the Lab model for database operations
module.exports = Lab;