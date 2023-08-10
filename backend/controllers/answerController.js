const asyncHandler = require('express-async-handler')

const answer = require('../models/answerModel')

const getanswers = asyncHandler(async (req, res) => {
  const answers = await answer.find()
  res.status(200).json(answers)
})
const addanswer = asyncHandler(async (req, res) => {
  const { question_id, answer } = req.body;

  const newAnswer = new answer({
    answer, 
    question_id 
  });

  const createdAnswer = await newAnswer.save();

  res.status(201).json(createdAnswer);
});

module.exports = {
  getanswers,
  addanswer
}
