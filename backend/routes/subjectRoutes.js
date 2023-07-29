const express = require('express');
const router = express.Router();
const {
  getsubjects,
  setsubject,
  updatesubject,
  deletesubject,
  toggleCompletesubject,
  toggleEditsubject,
} = require('../controllers/subjectController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getsubjects).post(protect, setsubject);
router
  .route('/:id')
  .delete(protect, deletesubject)
  .put(protect, updatesubject);
  
router.route('/:id/toggle-complete').put(protect, toggleCompletesubject);
router.route('/:id/toggleEdit').put(protect, toggleEditsubject);

module.exports = router;
