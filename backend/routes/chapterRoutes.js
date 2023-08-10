const express = require('express');
const router = express.Router();
const {
  addchapter,
  getchapters
} = require('../controllers/chapterController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getchapters).post(protect, addchapter);

module.exports = router;
