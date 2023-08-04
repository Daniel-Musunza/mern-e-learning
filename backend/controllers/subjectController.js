const asyncHandler = require('express-async-handler')
const subject = require('../models/subjectModel')


// @desc    Get subjects
// @route   GET /api/subjects
const getsubjects = asyncHandler(async (req, res) => {
  try {
    const userCourseId = req.user.course_id;
    console.log('User Course ID:', userCourseId);

    const subjects = await subject.find({ course_id: userCourseId });
    console.log('Filtered Subjects:', subjects);

    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
});




const getallsubjects = asyncHandler(async (req, res) => {
 
  const subjects = await subject.find()

  res.status(200).json(subjects)
})



module.exports = {
  getsubjects,
  getallsubjects,
}
