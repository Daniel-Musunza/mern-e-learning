const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
    },
    chapter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chapter',
    },
    correctanswer: {
        type: String,
    },
      answerA: {
        type: String,
      },
      answerB: {
        type: String,
      },
      answerC: {
        type: String,
      },
      answerD: {
        type: String,
      }
  },
);

module.exports = mongoose.model('question', questionSchema);
