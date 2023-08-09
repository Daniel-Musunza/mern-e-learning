const asyncHandler = require('express-async-handler');

const useranswer = require('../models/useranswerModel');


const getuseranswers = asyncHandler(async (req, res) => {
  const useranswers = await useranswer.find();
  res.status(200).json(useranswers);
});

const submitAnswers = async (req, res) => {
  try {
    const { user_id, question_id, answer_id } = req.body;

    // You can loop through the array and handle each answer
    for (const answer of req.body) {
      const { question_id, answer_id, user_id } = answer;

      let useranswerRecord = await useranswer.findOneAndUpdate(
        { user_id, question_id },
        { answer_id },
        { upsert: true, new: true }
      );

      // You can perform any necessary processing here
    }

    res.json({ message: 'Answers submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  getuseranswers,
  submitAnswers,
};
