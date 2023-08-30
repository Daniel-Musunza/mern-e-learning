const db = require('../config/db'); // Import the MySQL connection
// ...

const getchapters = (req, res) => {
  const query = 'SELECT * FROM chapters'; // Your query here

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching chapters' });
    } else {
      res.status(200).json(results);
    }
  });
};


const addchapter = async (req, res) => {
  try {
    const { subject_id, chapter } = req.body;
    const query = 'INSERT INTO chapters (subject_id, chapter) VALUES (?, ?)';
    const result = await db.query(query, [subject_id, chapter]);

    const newChapter = {
      id: result.insertId,
      subject_id,
      chapter,
    };

    res.status(200).json(newChapter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getchapters,
  addchapter,
};
