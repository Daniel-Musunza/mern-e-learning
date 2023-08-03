const asyncHandler = require('express-async-handler')

const subject = require('../models/subjectModel')


// @desc    Get subjects
// @route   GET /api/subjects
// @access  Private

const getsubjects = asyncHandler(async (req, res) => {
  const subjects = await subject.find({ user: req.user.id })

  res.status(200).json(subjects)
})

const getallsubjects = asyncHandler(async (req, res) => {
  const subjects = await subject.find()

  res.status(200).json(subjects)
})



module.exports = {
  getsubjects,
  getallsubjects,
}
