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
      }
  },
);

module.exports = mongoose.model('question', questionSchema);
