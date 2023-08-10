const asyncHandler = require('express-async-handler')

const chapter = require('../models/chapterModel')

const getchapters = asyncHandler(async (req, res) => {
  const chapters = await chapter.find()
  res.status(200).json(chapters)
})

const addchapter = asyncHandler(async (req, res) => {
  const { chapter, subject_id } = req.body;

  const newChapter = new chapter({
    chapter,
    subject_id
  });

  const createdChapter = await newChapter.save();

  res.status(201).json(createdChapter);
});

module.exports = {
  getchapters,
  addchapter
}
