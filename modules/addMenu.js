const inquirer = require("inquirer");
const cl = require("cli-color");
const { getRole, getManager,  getDepartment, addEmployee, addDepartment, addRole } = require("../models/Employee");


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
              loop: false,
            },
          ])
          .then((selectedRole) => {
            const role = selectedRole.role;
            params.push(role[0]);
            getManager().then((manager) => {
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the manager?\n",
                    choices: manager,
                    loop: false,
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
    })
};

const addDepartmentMenu = ()=>{
  return inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What department do you want to add?',
      validate: (input) => {
        if (checkString(input)) {
          return true;
        } else {
          error(" Please enter a valid department name!");
        }
      },
    }
    
  ]).then(ans =>{
    addDepartment(ans.department);
  })
}

const addRoleMenu = ()=>{
  return inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What role would you like to add?',
      validate: (input) => {
        if (checkString(input)) {
          return true;
        } else {
          error(" Please enter a valid department name!");
        }
      },
    },{
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
      validate: (input) =>{
        if (!isNaN(input)) {
          return true;
      } else {
          error(" Please digits only");
      }
    }
  }
  ]).then(ans =>{
    const params = [ans.role, ans.salary];

    getDepartment(params).then((department) =>{
      inquirer.prompt([
        {
          type: 'list',
          name: 'department',
          message: 'What is the department?',
          choices: department,
          loop: false,
        }
      ]).then(selectedDepartment =>{
        // role_id, salary, department_id
        params.push(selectedDepartment.department[0])
        
        addRole(params);
      })
    })
  })
}

module.exports = {
  addEmployeeMenu,
  addDepartmentMenu,
  addRoleMenu,
};
