const express = require('express');
const router = express.Router();
const {
  setCourse,
  getCourses
} = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCourses).post(protect, setCourse);
module.exports = router;
