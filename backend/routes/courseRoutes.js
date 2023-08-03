const express = require('express');
const router = express.Router();
const {
  getCourses
} = require('../controllers/courseController');

router.route('/courses').get(getCourses);

module.exports = router;
