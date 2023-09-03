const express = require('express');
const router = express.Router();
const {
  setCourse,
  getCourses,
  deleteCourse
} = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCourses).post(protect, setCourse).delete(protect, deleteCourse);
module.exports = router;


