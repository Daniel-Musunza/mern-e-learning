const mongoose = require('mongoose');

const correctanswerSchema = mongoose.Schema(
  {
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
      },
      answer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answer',
      },
  },
);

module.exports = mongoose.model('correctanswer', correctanswerSchema);
