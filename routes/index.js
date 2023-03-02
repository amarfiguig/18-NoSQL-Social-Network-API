const router = require('express').Router();
const apiRoutes = require('./api');

// Set up API routes
router.use('/api', apiRoutes);

// Catch all other routes and send an error message
router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
