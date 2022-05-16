const inquirer = require("inquirer");
const {getDepartment, deleteDepartment, deleteRole, getRole} = require('../models/Employee')

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
    deleteDepartmentMenu,
    deleteRoleMenu,
}