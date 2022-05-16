const inquirer = require("inquirer");
const {getDepartment, getRole, getEmployee, deleteEmployee, deleteDepartment, deleteRole,} = require('../models/Employee')

const deleteEmployeeMenu = () =>{
    getEmployee().then((employee) =>{
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee_name',
                message: 'Which employee do you want to delete?',
                choices: employee,
                loop: false,
            }
        ]).then(selectedEmployee =>{
            console.log()
            deleteEmployee(selectedEmployee.employee_name);
        })
    })
}   


const deleteDepartmentMenu = () =>{
    getDepartment().then((department) =>{
        return inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department do you want to delete?',
                choices: department,
                loop: false,
            }
        ]).then(selectedDepartment=>{
            deleteDepartment(selectedDepartment.department);
        })
    })
}

const deleteRoleMenu = () =>{
    getRole().then((roles) =>{
        return inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What role do you want to delete?',
                choices: roles,
                loop: false,
            }
        ]).then(selectedRole =>{
            deleteRole(selectedRole.role)
        })
    })
}

module.exports = {
    deleteEmployeeMenu,
    deleteDepartmentMenu,
    deleteRoleMenu,
}