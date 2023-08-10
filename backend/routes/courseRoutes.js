const express = require('express');
const router = express.Router();
const {
  addcourse,
  getCourses
} = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCourses).post(protect, addcourse);
module.exports = router;
