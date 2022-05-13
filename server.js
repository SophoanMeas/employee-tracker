const connection = require('./config/connection')

const PORT = process.env.PORT || 3001;
const db = process.env.DB_NAME;

connection.connect((err) =>{
  if (err) {
    return console.error('error: ' + err.message);
  }
  // console.log(`Connected to database`);
  console.log(`Connected to database: ${db}, Port: ${PORT}, Now listening...`);
});
