const express = require('express');
const router = express.Router();
const {
  addchapter,
  getchapters,
  deletechapter
} = require('../controllers/chapterController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getchapters).post(protect, addchapter).delete(protect, deletechapter);

module.exports = router;
