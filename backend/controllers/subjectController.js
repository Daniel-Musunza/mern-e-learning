const asyncHandler = require('express-async-handler')
const subject = require('../models/subjectModel')


// @desc    Get subjects
// @route   GET /api/subjects
const getsubjects = asyncHandler(async (req, res) => {
  const userCourseId = req.user.course_id;

  console.log('User Course ID:', userCourseId);

  // Use the aggregation framework to perform a lookup and filter subjects
  const subjects = await subject.aggregate([
    {
      $lookup: {
        from: 'users', // The name of the users collection
        localField: 'course_id',
        foreignField: 'course_id',
        as: 'userSubjects',
      },
    },
    {
      $match: {
        'userSubjects.course_id': userCourseId,
      },
    },
  ]);

  console.log('Filtered Subjects:', subjects);

  // Add some debug messages to the HTTP response
  res.status(200).json({ message: 'Subjects retrieved successfully', subjects });
});

// Rest of the code...






const getallsubjects = asyncHandler(async (req, res) => {
 
  const subjects = await subject.find()

  res.status(200).json(subjects)
})



module.exports = {
  getsubjects,
  getallsubjects,
}
