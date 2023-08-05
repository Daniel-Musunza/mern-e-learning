const express = require('express');
const router = express.Router();
const {
  getchapters
} = require('../controllers/chapterController');

router.route('/').get(getchapters);

module.exports = router;
