const asyncHandler = require('express-async-handler')
const Subject = require('../models/subjectModel')


// @desc    Get subjects
// @route   GET /api/subjects
const getsubjects = asyncHandler(async (req, res) => {
  try {
    const userCourseId = req.user.course_id;
    const subjects = await Subject.find({ course_id: userCourseId });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
});
const addNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    // Find the subject by ID
    const subject = await Subject.findById(id); // Make sure to use the correct model name (Subject)

    if (!subject) {
      return res.status(404).json({ message: 'subject not found' });
    }

    // Update the subject properties
    subject.notes = notes;
    // Save the updated subject
    await subject.save();

    res.json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const setSubject = asyncHandler(async (req, res) => {
  if (!req.body.subject||!req.body.course_name) {
    res.status(400)
    throw new Error('Please add a subject and Course Name')
  }

  const subject = await Subject.create({
    subject: req.body.subject,
    course_id: req.body.course_id,
    course_name: req.body.course_name,
  })

  res.status(200).json(subject)
});
const getallsubjects = asyncHandler(async (req, res) => {
 
  const subjects = await Subject.find()

  res.status(200).json(subjects)
})



module.exports = {
  getsubjects,
  addNotes,
  getallsubjects,
  setSubject 
}
