const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/getUsers', getUsers)
router.get('/me', protect, getMe)

module.exports = router
