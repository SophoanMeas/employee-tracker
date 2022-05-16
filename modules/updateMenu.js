const inquirer = require("inquirer");
const {
  getEmployee,
  getRole,
  updateEmployeeRole,
  updateEmployeeManager,
  getManager,
} = require("../models/Employee");

const updateEmployeeRoleMenu = () => {
  getEmployee().then((employee) => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee do you want to update?",
          choices: employee,
          loop: false,
        },
      ])
      .then((selectedEmployee) => {
        const params = [];
        const employee = selectedEmployee.employee[0];
        params.push(employee);

        getRole().then((role) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: role,
                loop: false,
              },
            ])
            .then((selectedRole) => {
              const role = selectedRole.role;
    
              if (role[1].match('Chief Executive Officer')){
                role[1] = null;
              }
              params.push(role[0]);
        
              // change the index role_id & employee_id to reflect mysql parameters ordering
              // employee = index 0  role = index 1, we want role_id = index 0 employee_id = idnex 1
              params[0] = role[0];
              params[1] = employee;
              
              updateEmployeeRole(params);
            });
        });
      });
  });
};

const updateEmployeeManagerMenu = () => {
  getEmployee().then((employee) => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          choices: employee,
          loop: false,
        },
      ])
      .then((selectedEmployee) => {
        const params = [];
        const employee_name = selectedEmployee.name[0];
        params.push(employee_name); // employee id

        getManager().then((manager) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager",
                message: "Who is the manager?",
                choices: manager,
                loop: false,
              },
            ])
            .then((selectedManager) => {
              const manager = selectedManager.manager;
              params.push(manager); // manager id
              // change the index employee_id & manager_id to reflect mysql parameters ordering
              // employee_id = index 0  manager_id = index 1, we want manager_id to be at index 0
              params[0] = manager;
              params[1] = employee_name;
              // [employee_id, manager_id]
              updateEmployeeManager(params);
            });
        });
      });
  });
};

const updateEmployeeDepMenu = () =>{
  getEmployee().then((employee =>{
    return inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update?',
        choices: employee,
        loop: false,
      }
    ]).then(selectedEmployee =>{
      const params = [];
      const employee = selectedEmployee.employee[0]
      params.push(employee)

    })
  }))
}

module.exports = {
  updateEmployeeRoleMenu,
  updateEmployeeManagerMenu,
  updateEmployeeDepMenu,
};
