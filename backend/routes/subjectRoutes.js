const express = require('express');
const router = express.Router();
const {
  getsubjects,
  getallsubjects
} = require('../controllers/subjectController');


// Keep this route as it requires authentication to get subjects by user ID
router.route('/').get( getsubjects);

// Remove the protect middleware from this route to allow unauthenticated access
router.route('/allsubjects').get(getallsubjects);

module.exports = router;
