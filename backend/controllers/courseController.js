const asyncHandler = require('express-async-handler')

const course = require('../models/courseModel')

const getCourses = asyncHandler(async (req, res) => {
  const courses = await course.find()
  res.status(200).json(courses)
})


module.exports = {
  getCourses
}
