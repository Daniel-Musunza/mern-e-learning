const express = require('express');
const router = express.Router();
const {
  getquestions
} = require('../controllers/questionController');

router.route('/').get(getquestions);

module.exports = router;
