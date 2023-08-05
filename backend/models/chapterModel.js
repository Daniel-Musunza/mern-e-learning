const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema(
  {
    chapter: {
      type: String,
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
  },
);

module.exports = mongoose.model('chapter', chapterSchema);
