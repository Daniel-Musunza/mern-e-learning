const express = require('express');
const router = express.Router();
const {
  getCourses
} = require('../controllers/courseController');

router.route('/').get(getCourses);

module.exports = router;
