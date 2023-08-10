const asyncHandler = require('express-async-handler')

const course = require('../models/courseModel')

const getCourses = asyncHandler(async (req, res) => {
  const courses = await course.find()
  res.status(200).json(courses)
})


const addcourse = asyncHandler(async (req, res) => {
  const { course_name } = req.body;

  const newCourse = new Course({
    course_name
  });

  const createdCourse = await newCourse.save();

  res.status(201).json(createdCourse);
});


module.exports = {
  getCourses,
  addcourse
}
