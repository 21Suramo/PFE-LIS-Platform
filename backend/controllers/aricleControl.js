
const Article = require('../modules/article'); // Ensure this path is correct

// Create new article
exports.createArticle = async (req, res) => {
  try {
    const { title, content, author, resume, equipe, statut } = req.body;

    if (!title || !content) { 
      return res.status(400).json({ message: 'Missing required fields: title, content.' });
    }

    const newArticleData = {
      title,
      content,
      author, 
      resume, 
      equipe, 
      statut, 
    };
    
    const newArticle = new Article(newArticleData);
    await newArticle.save();
    
    
    const populatedArticle = await Article.findById(newArticle._id)
                                          .populate('equipe', 'name'); 

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
      .populate('equipe', 'name'); 
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get articles', error: error.message });
  }
};

// Get single article by ID 
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('equipe', 'name');
      
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
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('equipe', 'name');

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