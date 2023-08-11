const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    course_name: {
      type: String,
    },
  },
);

module.exports = mongoose.model('Course', courseSchema);
