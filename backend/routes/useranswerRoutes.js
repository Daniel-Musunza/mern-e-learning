const express = require('express');
const router = express.Router();
const { submitAnswers, getuseranswers } = require('../controllers/useranswerController');

// Assuming you have the 'protect' middleware defined and imported
const { protect } = require('../middleware/authMiddleware');

// Define routes
router.route('/').get(getuseranswers);

// Protect this route with the 'protect' middleware
router.route('/:id').put(protect, submitAnswers);

module.exports = router;
