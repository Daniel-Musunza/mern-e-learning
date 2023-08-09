const mongoose = require('mongoose');

const useranswerSchema = mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
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

module.exports = mongoose.model('useranswer', useranswerSchema);
