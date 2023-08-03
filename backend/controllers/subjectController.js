const asyncHandler = require('express-async-handler')

const subject = require('../models/subjectModel')


// @desc    Get subjects
// @route   GET /api/subjects
const getsubjects = asyncHandler(async (req, res) => {
  const userCourseId = req.user.course_id;

  // Fetch subjects based on the provided userCourseId and subjectCourseId
  const subjects = await subject.find({ course_id: userCourseId });

  res.status(200).json(subjects);
});


const getallsubjects = asyncHandler(async (req, res) => {
  const subjects = await subject.find()

  res.status(200).json(subjects)
})



module.exports = {
  getsubjects,
  getallsubjects,
}
