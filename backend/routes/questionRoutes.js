const express = require('express');
const router = express.Router();
const {
  addquestion,
  getquestions,
  deleteQuestion
} = require('../controllers/questionController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getquestions).post(protect, addquestion).delete(protect, deleteQuestion);
module.exports = router;
