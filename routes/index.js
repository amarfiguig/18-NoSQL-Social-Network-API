// Require the express router
const router = require('express').Router();

// Import the user-routes module
const userRoutes = require('./user-routes');

// Import the thought-routes module
const thoughtRoutes = require('./thought-routes');

// Add a middleware that handles all routes for '/users' and delegates them to userRoutes module
router.use('/users', userRoutes);

// Add a middleware that handles all routes for '/thoughts' and delegates them to thoughtRoutes module
router.use('/thoughts', thoughtRoutes);

// Export the router to make it available to other modules
module.exports = router;
