const asyncHandler = require('express-async-handler')

const chapter = require('../models/chapterModel')

const getchapters = asyncHandler(async (req, res) => {
  const chapters = await chapter.find()
  res.status(200).json(chapters)
})


module.exports = {
  getchapters
}
