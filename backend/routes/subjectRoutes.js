const express = require('express');
const router = express.Router();
const {
  getsubjects,
} = require('../controllers/subjectController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getsubjects).post(protect, setsubject);

module.exports = router;
