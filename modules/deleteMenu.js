const inquirer = require("inquirer");
const {getDepartment, deleteDepartment} = require('../models/Employee')

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

module.exports = {
    deleteDepartmentMenu,
}