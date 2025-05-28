const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the axeRecherche schema
// This schema defines the structure of the axeRecherche documents in the MongoDB collection

const axeRechercheSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: false },
  dateCreation: { type: Date, default: Date.now },
  equipes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Team'  // Reference to the Team model
}]

});
// Create the axeRecherche model using the schema
// The model is a constructor function that creates instances of the User schema
const AxeRecherche = mongoose.model('AxeRecherche', axeRechercheSchema);


// Export the User model so it can be used in other files
// This allows other files to import and use the axeRecherche model for database operations
module.exports = AxeRecherche;
