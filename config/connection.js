const mysql = require('mysql2');
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: process.env.DB_PASSWORD,
//   database: 'employees'
// });