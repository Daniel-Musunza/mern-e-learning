const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    time: {
      type: String,
      required: [false],
    },
    completed: {
      type: Boolean,
      required: [false],
    },
    isEditing: {
      type: Boolean,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('subject', subjectSchema);
