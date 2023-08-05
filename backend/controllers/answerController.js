const asyncHandler = require('express-async-handler')

const answer = require('../models/answerModel')

const getanswers = asyncHandler(async (req, res) => {
  const answers = await answer.find()
  res.status(200).json(answers)
})


module.exports = {
  getanswers
}
