
const Article = require('../modules/article');
const Team = require('../modules/team');

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, resume, equipe, link } = req.body;
    const pdf = req.file ? `/uploads/${req.file.filename}` : undefined;
    const pdfName = req.file ? req.file.originalname : undefined;

    if (!title || !content || !equipe) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const team = await Team.findById(equipe);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const isMember =
      team.leader?.toString() === req.user.id ||
      team.membres.map((m) => m.toString()).includes(req.user.id);

    if (!isMember && !['RESPONSABLE', 'DIRECTEUR'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newArticle = await Article.create({
      title,
      content,
      resume,
      equipe,
      author: req.user.id,
      statut: 'PENDING',
      pdf,
      pdfName,
      link,
    });

    team.articles = team.articles || [];
    team.articles.push(newArticle._id);
    await team.save();

    const populatedArticle = await Article.findById(newArticle._id)
      .populate('equipe', 'name')
      .populate('author', 'nom');

    res.status(201).json({ message: 'Article created successfully!', article: populatedArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: 'Failed to create article', error: error.message });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('equipe', 'name')
      .populate('author', 'nom');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get articles', error: error.message });
  }
};

// Get articles by team
exports.getArticlesByTeam = async (req, res) => {
  try {
    const articles = await Article.find({ equipe: req.params.teamId })
    .populate('equipe', 'name')
    .populate('author', 'nom');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get articles', error: error.message });
  }
};

// Get single article by ID 
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    .populate('equipe', 'name')
    .populate('author', 'nom');
      
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get article', error: error.message });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    // req.body should contain fields to be updated: title, content, author, resume, equipe, statut
    const updateData = { ...req.body };
    if (req.file) {
      updateData.pdf = `/uploads/${req.file.filename}`;
      updateData.pdfName = req.file.originalname;
    }
    
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('equipe', 'name')
      .populate('author', 'nom');

    if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found for update.' });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: 'Failed to update article', error: error.message });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
        return res.status(404).json({ message: 'Article not found for deletion.' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete article', error: error.message });
  }
};

// Approve
exports.approveArticle = async (req, res) => {
  try {
    if (!['RESPONSABLE', 'DIRECTEUR'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { statut: 'APPROVED' },
      { new: true }
    )
    .populate('equipe', 'name')
    .populate('author', 'nom');
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve article', error: err.message });
  }
};

// Return to pending
exports.returnPending = async (req, res) => {
  try {
    if (!['RESPONSABLE', 'DIRECTEUR'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { statut: 'PENDING' },
      { new: true }
    )
    .populate('equipe', 'name')
    .populate('author', 'nom');
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Failed to return article to pending', error: err.message });
  }
};
