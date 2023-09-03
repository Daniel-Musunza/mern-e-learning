const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// @desc    Get subjects
// @route   GET /api/subjects
const getsubjects = asyncHandler(async (req, res) => {
  try {
    const userCourseId = req.user.course_id;
    const query = 'SELECT * FROM subjects WHERE course_id = ?';
    const subjects = await db.query(query, [userCourseId]);

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
});

const addNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const findSubjectQuery = 'SELECT * FROM subjects WHERE id = ?';
    const subject = await db.query(findSubjectQuery, [id]);

    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const updateNotesQuery = 'UPDATE subjects SET notes = ? WHERE id = ?';
    await db.query(updateNotesQuery, [notes, id]);

    res.json({ id, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const setSubject = asyncHandler(async (req, res) => {
  if (!req.body.subject || !req.body.course_name) {
    res.status(400);
    throw new Error('Please add a subject and Course Name');
  }

  const { subject, course_id, course_name } = req.body;
  const insertSubjectQuery = 'INSERT INTO subjects (subject, course_id, course_name) VALUES (?, ?, ?)';
  const result = await db.query(insertSubjectQuery, [subject, course_id, course_name]);

  const newSubject = {
    id: result.insertId,
    subject,
    course_id,
    course_name,
  };

  res.status(200).json(newSubject);
});

const getallsubjects = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM subjects';
  const subjects = await db.query(query);

  res.status(200).json(subjects);
});

const deleteSubjects = async(req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM subjects WHERE id = ?';
  try{
    const result = await db.query(query, [id]);
    res.status(200).json(result);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getsubjects,
  addNotes,
  getallsubjects,
  setSubject,
  deleteSubjects,
};
