const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getquestions = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM questions';
  const questions = await db.query(query);
  res.status(200).json(questions);
});

const addquestion = asyncHandler(async (req, res) => {
  try {
    const {
      chapter_id,
      question,
      correctanswer,
      answerA,
      answerB,
      answerC,
      answerD,
    } = req.body;

    if (
      !chapter_id ||
      !question ||
      !correctanswer ||
      !answerA ||
      !answerB
    ) {
      res.status(400);
      throw new Error('Please Fill all the fields');
    }

    const insertQuestionQuery = `
      INSERT INTO questions (chapter_id, question, correctanswer, answerA, answerB, answerC, answerD)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.query(insertQuestionQuery, [
      chapter_id,
      question,
      correctanswer,
      answerA,
      answerB,
      answerC,
      answerD,
    ]);

    const newQuestion = {
      id: result.insertId,
      chapter_id,
      question,
      correctanswer,
      answerA,
      answerB,
      answerC,
      answerD,
    };

    res.status(200).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  getquestions,
  addquestion,
};
