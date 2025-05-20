const Article = require('../modules/article'); // Import the Article model

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully!', article: newArticle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create article', error: error.message });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('equipes');// find all articles 
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get articles', error: error.message });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ID from the URL like /articles/:id , new body, save
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update article', error: error.message });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete article', error: error.message });
  }
};

// Get single article by ID 
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('equipes'); // Populate the 'equipe' field with the corresponding data;
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get article', error: error.message });
  }
};