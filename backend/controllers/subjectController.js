const asyncHandler = require('express-async-handler')

const subject = require('../models/subjectModel')
const User = require('../models/userModel')

// @desc    Get subjects
// @route   GET /api/subjects
// @access  Private
const getsubjects = asyncHandler(async (req, res) => {
  const subjects = await subject.find({ user: req.user.id })

  res.status(200).json(subjects)
})

// @desc    Set subject
// @route   POST /api/subjects
// @access  Private
const setsubject = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const subject = await subject.create({
    text: req.body.text,
    time: req.body.time,
    user: req.user.id,
  })

  res.status(200).json(subject)
})

const toggleCompletesubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the subject by ID
    const subject = await subject.findById(id);

    if (!subject) {
      return res.status(404).json({ message: 'subject not found' });
    }

    // Toggle the completion status
    subject.completed = !subject.completed;

    // Save the updated subject
    await subject.save();

    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const toggleEditsubject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the subject by ID
    const subject = await subject.findById(id);

    if (!subject) {
      return res.status(404).json({ message: 'subject not found' });
    }

    // Toggle the completion status
    subject.isEditing = !subject.isEditing;

    // Save the updated subject
    await subject.save();

    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
const updatesubject = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { text, time } = req.body;

      // Find the subject by ID
      const subject = await subject.findById(id);

      if (!subject) {
        return res.status(404).json({ message: 'subject not found' });
      }

      // Update the subject properties
      subject.text = text;
      subject.time = time;

      // Save the updated subject
      await subject.save();

      res.json(subject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
})

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deletesubject = asyncHandler(async (req, res) => {
  const subject = await subject.findById(req.params.id)

  if (!subject) {
    res.status(400)
    throw new Error('subject not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the subject user
  if (subject.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await subject.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getsubjects,
  setsubject,
  updatesubject,
  deletesubject,
  toggleCompletesubject,
  toggleEditsubject
}
