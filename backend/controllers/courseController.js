const asyncHandler = require('express-async-handler')

const Course = require('../models/courseModel')

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
  res.status(200).json(courses)
})


const setCourse = asyncHandler(async (req, res) => {
  if (!req.body.course_name) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const course = await Course.create({
    course_name: req.body.course_name,
  })

  res.status(200).json(course)
});


module.exports = {
  getCourses,
  setCourse
}
