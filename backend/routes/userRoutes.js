const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const protect = require('../middlewares/authMidleware');
const isSuperAdmin = require('../middlewares/isSuperAdmin');

// Only superAdmin can create team leaders
router.post('/create-team-leader', protect, isSuperAdmin, userController.createTeamLeader);

module.exports = router;
// This code defines a route for creating team leaders in an Express application. It uses a controller to handle the logic for the route and middleware for authentication and authorization. Only super admins can create team leaders, ensuring that this action is restricted to users with the appropriate permissions. The route is protected by authentication middleware, and the authorization middleware checks if the user is a super admin before allowing the action to proceed.
// The route is defined using the POST method and is associated with the '/create-team-leader' endpoint. The userController.createTeamLeader function will handle the request when this endpoint is hit. The router is then exported for use in other parts of the application.