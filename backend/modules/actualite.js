// modules/actualite.js (New File)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actualiteSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  contenu: { type: String, required: true },
  datePublication: { type: Date, default: Date.now },
  imageUrl: { type: String, required: false },
  pdf: { type: String, required: false },
  pinned: { type: Boolean, default: false },
  // Optional: Add a 'type' or 'categorie' if you need to distinguish news types
  // type: { type: String, default: 'Général' }
  // Optional: Link to an author if news items are authored by specific users
  // auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Actualite = mongoose.model('Actualite', actualiteSchema);
module.exports = Actualite;