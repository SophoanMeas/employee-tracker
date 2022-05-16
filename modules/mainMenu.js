const chalkAnimation = require("chalkercli");
const inquirer = require("inquirer");
const { addEmployeeMenu, addDepartmentMenu, addRoleMenu } = require("./addMenu");
const {
  updateEmployeeRoleMenu,
  updateEmployeeManagerMenu,
  updateEmployeeDepMenu,
} = require("./updateMenu");
const { deleteEmployeeMenu, deleteDepartmentMenu, deleteRoleMenu } = require("./deleteMenu");
const employee = require("../models/Employee");

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
          { // employee
            name: "View All Employees",
            value: 1,
          },
          {
            name: "View Employees By Manager",
            value: 2,
          },
          {
            name: "View Employees By Department",
            value: 3,
          },
          {
            name: "Add Employee",
            value: 4,
          },
          {
            name: "Update Employee Role",
            value: 5,
          },
          {
            name: "Update Employee Manager",
            value: 6,
          },
          {
            name: "Delete Employee",
            value: 7,
          }, // end of employee
          {
            // roles
            name: "View All Roles",
            value: 8,
          },
          {
            name: "Add Role",
            value: 9,
          },
          {
            name: "Delete Roles",
            value: 10,
          }, // end of roles
          {
            // department
            name: "View All Departments",
            value: 11,
          },
          {
            name: "Add Department",
            value: 12,
          },
          {
            name: "Delete Department",
            value: 13,
          },
          {
            name: "View Department Budgets",
            value: 14,
          },
          {
            name: "Quit",
          },
        ],
        loop: false,
      },
    ])
    .then((ans) => {
      const selection = ans.choice;

      switch (selection) {
        case 1:
          employee.viewAllEmployee();
          break;
        case 2:
          employee.viewEmployeesByManager();
          break;
          case 3:
          employee.viewEmployeeByDepartment();
            break;
        case 4:
          addEmployeeMenu();
          break;
        case 5:
          updateEmployeeRoleMenu();
          break;
        case 6:
          updateEmployeeManagerMenu();
          break;
        case 7:
         deleteEmployeeMenu();
          break;
        case 8:
          employee.viewAllRoles();
          break;
        case 9:
          addRoleMenu();
          break;
        case 10:
          deleteRoleMenu();
          break;
        case 11:
          employee.viewAllDepartment();
          break;
        case 12:
          addDepartmentMenu();
          break;
        case 13:
          deleteDepartmentMenu();
          break;
        case 14:
          employee.viewBudget();
          break;
        default:
          employee.exist();
      }
   
    });
};

module.exports = {
  init,
  promptUser,
};
