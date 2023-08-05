const mongoose = require('mongoose');

const answerSchema = mongoose.Schema(
  {
    answer: {
      type: String,
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
      },
  },
);

module.exports = mongoose.model('answer', answerSchema);
