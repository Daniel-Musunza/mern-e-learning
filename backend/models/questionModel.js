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
  },
);

module.exports = mongoose.model('question', questionSchema);
