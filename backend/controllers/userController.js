const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password ,resume, course_id, course_name, units, tutor, approved, admin} = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    resume, 
    course_name,
    course_id,
    units,
    tutor,
    approved,
    admin,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      resume: user.resume,
      course_name: user.course_name,
      course_id: user.course_id,
      units: user.units,
      tutor: user.tutor,
      approved: user.approved,
      admin: user.admin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      resume: user.resume,
      course_name: user.course_name,
      course_id: user.course_id,
      units: user.units,
      email: user.email,
      tutor: user.tutor,
      approved: user.approved,
      admin: user.admin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})
//update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin, approved } = req.body;

    // Find the user by ID
    const user = await User.findById(id); // Make sure to use the correct model name (Subject)

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Update the user properties
    user.admin = admin;
    user.approved = approved;
    // Save the updated user
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUser
}
