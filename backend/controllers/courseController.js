const asyncHandler = require('express-async-handler');
const db = require('../config/db'); // Import the MySQL connection
// ...

const getCourses = (req, res) => {
  const query = 'SELECT * FROM courses'; // Your query here

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching courses' });
    } else {
      res.status(200).json(results);
    }
  });
};

const setCourse = asyncHandler(async (req, res) => {
  try {
    const { course_name } = req.body;

    
    const insertCourseQuery = 'INSERT INTO courses (course_name) VALUES (?)';
    const result = await db.query(insertCourseQuery, [course_name]);

    
    if (result.affectedRows === 1) {
      const courseId = result.insertId;

      res.status(201).json({
        id: courseId,
        course_name,
      });
    } else {
      res.status(400).json({ message: 'please add Course Name' });
      throw new Error('Invalid');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM courses WHERE id =?';

  try {
    const result = await db.query(query, [id]);
    res.status(200).json(result);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getCourses,
  setCourse,
  deleteCourse
};
