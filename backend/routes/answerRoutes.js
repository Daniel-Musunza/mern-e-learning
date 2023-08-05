const express = require('express');
const router = express.Router();
const {
  getanswers
} = require('../controllers/answerController');

router.route('/').get(getanswers);

module.exports = router;
