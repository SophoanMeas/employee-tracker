const inquirer = require("inquirer");
const cl = require("cli-color");

function error(string) {
  return console.log(cl.redBright.bold(string));
}

function checkString(str){
    return /^[A-Za-z\s]*$/.test(str)
}
const addEmployee = () =>{
  return inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
      validate: (input) => {
        if (checkString(input)) {
          return true;
        } else {
          error(" Please enter a valid first name!");
        }
      },
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
      validate: (input) => {
        if (checkString(input)) {
          return true;
        } else {
          error(" Please enter a valid first name!");
        }
      },
    },
  ])
  .then((ans) => {
  })
};


module.exports = {
  addEmployee,

};
