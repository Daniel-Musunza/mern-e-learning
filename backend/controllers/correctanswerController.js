const asyncHandler = require('express-async-handler')

const correctanswer = require('../models/correctanswerModel')

const getcorrectanswers = asyncHandler(async (req, res) => {
  const correctanswers = await correctanswer.find()
  res.status(200).json(correctanswers)
})


module.exports = {
  getcorrectanswers
}
