const express = require('express');
const router = express.Router();
const {
  getcorrectanswers
} = require('../controllers/correctanswerController');

router.route('/').get(getcorrectanswers);

module.exports = router;
