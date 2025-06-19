const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the article schema
// This schema defines the structure of the article documents in the MongoDB collection

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the article, required field that verifies the title value 
  content: { type: String, required: true },
  resume: { type: String, required: false },
  pdf: { type: String, required: false },
  pdfName: { type: String, required: false },
  link: { type: String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },// Date when the article was created, defaults to the current date
    statut: {
    type: String,
    enum: ['DRAFT', 'PENDING', 'APPROVED', 'REFUSED'],
    default: 'PENDING'
  },
  equipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});



// Create the Article model using the schema
// The model is a constructor function that creates instances of the article schema
const Article = mongoose.model('Article', articleSchema);


// Export the Article model so it can be used in other files
// This allows other files to import and use the Article model for database operations
module.exports = Article;