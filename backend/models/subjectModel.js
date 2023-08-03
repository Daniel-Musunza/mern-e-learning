const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    subject: {
      type: String,
      required: [true, 'Please add a unit'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('subject', subjectSchema);
