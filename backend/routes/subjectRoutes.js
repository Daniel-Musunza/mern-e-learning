const express = require('express');
const router = express.Router();
const {
  getsubjects,
  addNotes,
  getallsubjects
} = require('../controllers/subjectController');
const { protect } = require('../middleware/authMiddleware');

// Keep this route as it requires authentication to get subjects by user ID
router.route('/').get(protect, getsubjects);
router
  .route('/:id')
  .put(protect, addNotes);
// Remove the protect middleware from this route to allow unauthenticated access
router.route('/allsubjects').get(getallsubjects);

module.exports = router;
