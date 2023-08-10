const asyncHandler = require('express-async-handler')

const question = require('../models/questionModel')

const getquestions = asyncHandler(async (req, res) => {
  const questions = await question.find()
  res.status(200).json(questions)
})

const addquestion = asyncHandler(async (req, res) => {
  const { question, chapter_id, correctanswer } = req.body;

  const newQuestion = new question({
    question, 
    chapter_id, 
    correctanswer 
  });

  const createdQuestion = await newQuestion.save();

  res.status(201).json(createdQuestion);
});
module.exports = {
  getquestions,
  addquestion
}
