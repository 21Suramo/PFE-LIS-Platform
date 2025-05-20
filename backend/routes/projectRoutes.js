const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectControl');
const authMiddleware = require('../middlewares/authMidleware');

// Create project (protected)
router.post('/', authMiddleware, projectController.createProject);

// Get all projects (public)
router.get('/', projectController.getAllProjects);

// Get single project
router.get('/:id', projectController.getProjectById);

// Update project (protected)
router.put('/:id', authMiddleware, projectController.updateProject);

// Delete project (protected)
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
// This code defines the routes for handling project-related requests in an Express application. It uses a controller to handle the logic for each route and a middleware for authentication. The routes include creating, retrieving, updating, and deleting projects.