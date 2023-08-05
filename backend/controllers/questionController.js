const asyncHandler = require('express-async-handler')

const question = require('../models/questionModel')

const getquestions = asyncHandler(async (req, res) => {
  const questions = await question.find()
  res.status(200).json(questions)
})


module.exports = {
  getquestions
}
