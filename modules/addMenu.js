const inquirer = require("inquirer");
const cl = require("cli-color");
const { getRole, getManager, addEmployee } = require("../models/Employee");

function error(string) {
  return console.log(cl.redBright.bold(string));
}

function checkString(str) {
  return /^[A-Za-z\s]*$/.test(str);
}

const addEmployeeMenu = () => {
  return inquirer
    .prompt([
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
      const _first_name =
        ans.first_name.charAt(0).toUpperCase() + ans.first_name.slice(1);
      const _last_name =
        ans.last_name.charAt(0).toUpperCase() + ans.last_name.slice(1);
      const params = [_first_name, _last_name];

      getRole().then((roles) => {
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((selectedRole) => {
            const role = selectedRole.role;
            params.push(role);

            getManager().then((manager) => {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the manager?\n",
                    choices: manager,
                  },
                ])
                .then((selectedManager) => {
                  const mgr = selectedManager.manager;
                  params.push(mgr);

                  addEmployee(params);
                });
            });
          });
      });
    });
};

module.exports = {
  addEmployeeMenu,
};
