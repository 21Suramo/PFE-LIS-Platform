const express = require('express');
const router = express.Router();
const articleController = require('../controllers/aricleControl');
const authMiddleware = require('../middlewares/authMidleware');
const upload = require('../middlewares/upload');

// Create article (protected)
router.post('/', authMiddleware, upload.single('pdf'), articleController.createArticle);

// Get all articles (public)
router.get('/', articleController.getAllArticles);

// Get articles by team (public)
router.get('/team/:teamId', articleController.getArticlesByTeam);


// Get single article (public)
router.get('/:id', articleController.getArticleById);

// Update article (protected)
router.put('/:id', authMiddleware, upload.single('pdf'), articleController.updateArticle);

// Delete article (protected)
router.delete('/:id', authMiddleware, articleController.deleteArticle);

// Approve and return pending articles (protected)
router.put('/:id/approve', authMiddleware, articleController.approveArticle);
router.put('/:id/pending', authMiddleware, articleController.returnPending);


module.exports = router;
// This code defines the routes for handling article-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting articles.
