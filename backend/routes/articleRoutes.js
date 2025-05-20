const express = require('express');
const router = express.Router();
const articleController = require('../controllers/aricleControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create article (protected)
router.post('/', authMiddleware, articleController.createArticle);

// Get all articles (public)
router.get('/', articleController.getAllArticles);

// Get single article (public)
router.get('/:id', articleController.getArticleById);

// Update article (protected)
router.put('/:id', authMiddleware, articleController.updateArticle);

// Delete article (protected)
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
// This code defines the routes for handling article-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting articles.
