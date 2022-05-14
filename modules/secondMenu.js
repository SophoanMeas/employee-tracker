const inquirer = require("inquirer");

const promptAddEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            
        }
        ])
}

module.exports = {
    promptAddEmployee,

}