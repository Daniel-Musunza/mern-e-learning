const asyncHandler = require('express-async-handler')

const question = require('../models/questionModel')

const getquestions = asyncHandler(async (req, res) => {
  const questions = await question.find()
  res.status(200).json(questions)
})


const addquestion = asyncHandler(async (req, res) => {
  if (!req.body.chapter_id||!req.body.question||!req.body.correctanswer||!req.body.answerA||!req.body.answerB) {
    res.status(400)
    throw new Error('Please Fill all the fields')
  }

  const newQuestion = await question.create({
    question: req.body.question,
    chapter_id: req.body.chapter_id,
    correctanswer: req.body.correctanswer,
    answerA: req.body.answerA,
    answerB: req.body.answerB,
    answerC: req.body.answerC,
    answerD: req.body.answerD,
  })

  res.status(200).json(newQuestion)
});
module.exports = {
  getquestions,
  addquestion
}
