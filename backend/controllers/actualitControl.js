const Actualite = require('../modules/actualite');

//  Create
exports.createActualite = async (req, res) => {
  try {
    const { titre, contenu, datePublication, pinned } = req.body;

    if (!titre || !contenu) {
      return res.status(400).json({ message: 'Titre et contenu sont requis.' });
    }

    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];
    const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : "";
    const pdf = pdfFile ? `/uploads/${pdfFile.filename}` : undefined;

    const actualite = new Actualite({
      titre,
      contenu,
      datePublication: datePublication || new Date(),
      pinned: pinned === "true", // FormData sends booleans as strings
      imageUrl,
      pdf,
    });

    await actualite.save();
    res.status(201).json({ message: 'Actualité créée avec succès.', actualite });
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

//  Get all
exports.getAllActualites = async (req, res) => {
  try {
    const actualites = await Actualite.find().sort({ datePublication: -1 });
    res.status(200).json(actualites);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

//  Get one
exports.getActualiteById = async (req, res) => {
  try {
    const actualite = await Actualite.findById(req.params.id);
    if (!actualite) return res.status(404).json({ message: 'Actualité non trouvée' });
    res.status(200).json(actualite);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

//  Update
exports.updateActualite = async (req, res) => {
  try {
    const { titre, contenu, datePublication, pinned } = req.body;
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];
    const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : undefined;
    const pdf = pdfFile ? `/uploads/${pdfFile.filename}` : undefined;

    const updatedFields = {
      titre,
      contenu,
      datePublication,
      pinned: pinned === "true",
    };

    if (imageUrl) {
      updatedFields.imageUrl = imageUrl;
    }

    if (pdf) {
      updatedFields.pdf = pdf;
    }

    const updated = await Actualite.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Actualité introuvable' });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Erreur mise à jour :", error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

//  Delete
exports.deleteActualite = async (req, res) => {
  try {
    const deleted = await Actualite.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Actualité introuvable' });
    res.status(200).json({ message: 'Actualité supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
