const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Event schema
// This schema defines the structure of the Event documents in the MongoDB collection

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: false }, // For physical location if applicable

  // New fields to categorize and specify event nature
  eventType: { // More specific than the old 'categorie' from frontend mock
    type: String,
    required: true,
    enum: ["Interne", "Externe", "Séminaire", "Atelier", "Conférence"],
    default: 'Autre'
  },
  format: { // To specify if in-person, online, or hybrid
    type: String,
    required: true,
    enum: ['Présentiel', 'En Ligne', 'Hybride'],
    default: 'Présentiel'
  },
  streamingUrl: { type: String, required: false }, // URL for online access
  
  // Field from frontend mockData for filtering (e.g. EventsPage vs NewsPage for external events)
  origine: { 
    type: String,
    enum: ["LIS", "Autre"],
    default: 'LIS',
    required: true
  },

  // Existing fields
  image: { type: String, required: false }, // Frontend uses imageUrl, but we're keeping backend names for now
  pdf: { type: String, required: false }, // Event flyer in PDF format
  createdAt: { type: Date, default: Date.now }
});

// Create the Event model using the schema
// The model is a constructor function that creates instances of the Event schema
const Event = mongoose.model('Event', eventSchema);


// Export the Event model so it can be used in other files
// This allows other files to import and use the Event model for database operations
module.exports = Event;