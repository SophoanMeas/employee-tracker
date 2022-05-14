const chalkAnimation = require("chalkercli");
const inquirer = require("inquirer");
const choice = require("../models/Employee");
const {addEmployee, hi} = require('./secondMenu')
const welcome = `
███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗ 
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗      ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝      ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗    ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                                                                                                                       
`;
init = () => {
  // const rainbow = chalkAnimation.rainbow(welcome);

  // setTimeout(() => {
  //   rainbow.stop(); // Animation stops
  //   promptUser();
  // }, 3000);
  promptUser();
};

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: 1,
          },
          {
            name: "View Employees by Department",
            value: 2,
          },
          {
            name: "Add Employee",
            value: 3,
          },
          {
            name: "Update Employee Role",
            value: 4,
          },
          {
            name: "Update Employee by Managers",
            value: 5,
          },
          {
            name: "Update Employees by Department",
            value: 6,
          },
          {
            name: "Delete Employees",
            value: 7,
          },
          {
            name: "View All Roles",
            value: 8,
          },
          {
            name: "Add Role",
            value: 9,
          },
          {
            name: "Delete roles",
            value: 10,
          },
          {
            name: "View All Departments",
            value: 11,
          },
          {
            name: "Add Department",
            value: 12,
          },
          {
            name: "View Department Budgets",
            value: 13,
          },
          {
            name: "Delete Departments",
            value: 14,
          },
          {
            name: "Quit",
          },
        ],
      },
    ])
    .then((ans) => {
      const selection = ans.choice;

      switch (selection) {
        case 1:
          choice.viewAllEmployee();
          break;
        case 2:
          choice.viewEmployeeByDepartment();
          break;
        case 3:
          addEmployee();
          // choice.addEmployee();
          break;
          case 4:
            break;
            case 5:
            break;
            case 6:
            break;
            case 7:
            break;
            case 8:
            break;
            case 9:
            break;
            case 10:
            break;
            case 11:
            break;
            case 12:
            break;
            case 13:
            break;
            case 14:
            break;
        default:
          choice.exist();
      }

      // choice.exist();
    });
};

module.exports = {
  init,
};
