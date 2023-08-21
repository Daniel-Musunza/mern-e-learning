const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    course_name: {
      type: String,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
    },
    resume: {
      type: Buffer,
    },
    units: {
      type: Array,
    },
    tutor: {
      type: Boolean,
    },
    admin: {
      type: Boolean,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
