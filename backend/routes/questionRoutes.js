const express = require('express');
const router = express.Router();
const {
  addquestion,
  getquestions
} = require('../controllers/questionController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getquestions).post(protect, addquestion);
module.exports = router;
