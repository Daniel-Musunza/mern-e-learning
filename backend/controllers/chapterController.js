const asyncHandler = require('express-async-handler')

const Chapter = require('../models/chapterModel')

const getchapters = asyncHandler(async (req, res) => {
  const chapters = await Chapter.find()
  res.status(200).json(chapters)
})

const addchapter = asyncHandler(async (req, res) => {
  if (!req.body.subject_id||!req.body.chapter) {
    res.status(400)
    throw new Error('Please add a subject and Chapter Name')
  }

  const chapter = await Chapter.create({
    chapter: req.body.chapter,
    subject_id: req.body.subject_id,
  })

  res.status(200).json(chapter)
});

module.exports = {
  getchapters,
  addchapter
}
