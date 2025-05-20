const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Event schema
// This schema defines the structure of the Event documents in the MongoDB collection

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true }, // title of the Event, required field that verifies the name value 
  location: { type: String, required: false }, // location of the Event, not required
  date: { type: Date, required: false }, 
  description : { type: String, required: true },
    image: { type: String, required: false }, // URL of the image associated with the Event
  createdAt: { type: Date, default: Date.now }// Date when the Event was created, defaults to the current date
});

// Create the Event model using the schema
// The model is a constructor function that creates instances of the Event schema
const Event = mongoose.model('Event', eventSchema);


// Export the Event model so it can be used in other files
// This allows other files to import and use the Event model for database operations
module.exports = Event;