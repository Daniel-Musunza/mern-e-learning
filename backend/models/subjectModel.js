const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
    },
    subject: {
      type: String,
      required: [true, 'Please add a unit'],
    },
    course_name: {
      type: String,
      required: [true, 'Please add Course Name'],
    },
    notes: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Subject', subjectSchema);
