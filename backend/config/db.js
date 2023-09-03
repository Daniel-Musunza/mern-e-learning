const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'schooladmin',
  password: 'school1234',
  database: 'e_learning',
  port: 3306,
  timeout: 60000,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log('database' + ' ' + connection.state  );
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  query,
};
