const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const db = require('../config/db'); // Your MySQL connection

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: '30d',
  });
  
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, resume, course_id, course_name, units, tutor, approved, admin } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if user exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    const existingUser = await db.query(checkUserQuery, [email]);

    if (existingUser.length > 0) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    const insertUserQuery = `
      INSERT INTO users (name, email, resume, course_id, course_name, units, tutor, approved, admin, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertUserValues = [
      name,
      email,
      resume,
      course_id,
      course_name,
      JSON.stringify(units), // Convert units to JSON string
      tutor,
      approved,
      admin,
      hashedPassword,
    ];

    const result = await db.query(insertUserQuery, insertUserValues);

    if (result.affectedRows === 1) {
      const userId = result.insertId;
      const token = generateToken(userId);

      res.status(201).json({
        id: userId,
        name,
        email,
        resume,
        course_name,
        course_id,
        units,
        tutor,
        approved,
        admin,
        hashedPassword,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const getUserQuery = 'SELECT * FROM users WHERE email = ?';
    const users = await db.query(getUserQuery, [email]);

    if (users.length === 1 && (await bcrypt.compare(password, users[0].password))) {
      const user = users[0];
      const token = generateToken(user.id);

      res.json({
        id: user.id,
        name: user.name,
        resume: user.resume,
        course_name: user.course_name,
        course_id: user.course_id,
        units: user.units,
        email: user.email,
        tutor: user.tutor,
        approved: user.approved,
        admin: user.admin,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const getUserQuery = 'SELECT * FROM users WHERE id = ?';
    const users = await db.query(getUserQuery, [userId]);

    if (users.length === 1) {
      const user = users[0];
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUsersQuery = 'SELECT * FROM users';
    const users = await db.query(getAllUsersQuery);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { admin, approved } = req.body;

    const updateUserQuery = 'UPDATE users SET admin = ?, approved = ? WHERE id = ?';
    await db.query(updateUserQuery, [admin, approved, id]);

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



  
// };
console.log(generateToken);
module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUser,
};
