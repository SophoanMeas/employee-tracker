const connection = require('./config/connection')
const chalkAnimation = require('chalkercli');

const {init} = require('./modules/menu')

const PORT = process.env.PORT || 3001;
const db = process.env.DB_NAME;

connection.connect((err) =>{
  if (err) {
    return console.error('error: ' + err.message);
  }

// const karaoke = chalkAnimation.karaoke(`Connected to database: ${db}, Port: ${PORT}, Now listening...`, 3);
// setTimeout(() => {
//   karaoke.stop(); // Animation stops
  init();
// }, 3000);
});
