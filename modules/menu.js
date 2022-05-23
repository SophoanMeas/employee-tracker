const chalkAnimation = require('chalkercli');
const inquirer = require('inquirer');
const cl = require('cli-color');
const employee = require('../models/Employee');
const connection = require('../config/connection');
const { getEmployee } = require('../models/Employee');

const welcome = `
███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗ 
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗      ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝      ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗    ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                                                                                                                       
`;

const init = () => {
	const rainbow = chalkAnimation.rainbow(welcome);

	setTimeout(async () => {
		rainbow.stop(); // Animation stops
		while (true) {
			console.clear();
			await menu();
		}
	}, 3000);
};

function error(string) {
	return console.log(cl.redBright.bold(string));
}

function checkString(str) {
	return /^[A-Za-z\s]*$/.test(str);
}

async function noManager(params) {
	await inquirer
		.prompt([
			{
				type: 'list',
				name: 'name',
				message: 'No Manager',
				choices: [ 'none' ]
			}
		])
		.then(() => {
			params[3] = null;
			employee.addEmployee(params);
		});
}

function exist() {
	let str = '\nExiting program...';
	const rainbow = chalkAnimation.karaoke(str);

	setInterval(() => {
		connection.end();
	}, 1000);
}

const menu = async () => {
	await inquirer
		.prompt([
			{
				type: 'list',
				name: 'choice',
				message: 'What would you like to do?',
				choices: [
					{ name: 'View All Employees', value: 1 },
					{ name: 'View Employees By Manager', value: 2 },
					{ name: 'View Employees By Department', value: 3 },
					{ name: 'Add Employee', value: 4 },
					{ name: 'Update Employee Role', value: 5 },
					{ name: 'Update Employee Manager', value: 6 },
					{ name: 'Delete Employee', value: 7 },
					{ name: 'View All Roles', value: 8 },
					{ name: 'Add Role', value: 9 },
					{ name: 'Delete Roles', value: 10 },
					{ name: 'View All Departments', value: 11 },
					{ name: 'Add Department', value: 12 },
					{ name: 'Delete Department', value: 13 },
					{ name: 'View Department Budgets', value: 14 },
					{ name: 'Quit', value: 15 }
				],
				loop: false
			}
		])
		.then(async (answer) => {
			switch (answer.choice) {
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
					await addEmployeeMenu();
					break;
				case 5:
					await updateEmployeeRoleMenu();
					break;
				case 6:
					await updateEmployeeManagerMenu();
					break;
				case 7:
					await deleteEmployeeMenu();
					break;
				case 8:
					employee.viewAllRoles();
					break;
				case 9:
					await addRoleMenu();
					break;
				case 10:
					await deleteRoleMenu();
					break;
				case 11:
					employee.viewAllDepartment();
					break;
				case 12:
					await addDepartmentMenu();
					break;
				case 13:
					await deleteDepartmentMenu();
					break;
				case 14:
					employee.viewBudget();
					break;
				default:
					exist();
			}
		});
};

const addEmployeeMenu = async () => {
	await inquirer
		.prompt([
			{
				type: 'input',
				name: 'first_name',
				message: "What is the employee's first name?",
				validate: (input) => {
					if (checkString(input)) {
						return true;
					} else {
						error(' Please enter a valid first name!');
					}
				}
			},
			{
				type: 'input',
				name: 'last_name',
				message: "What is the employee's last name?",
				validate: (input) => {
					if (checkString(input)) {
						return true;
					} else {
						error(' Please enter a valid first name!');
					}
				}
			}
		])
		.then(async (ans) => {
			const _first_name = ans.first_name.charAt(0).toUpperCase() + ans.first_name.slice(1);
			const _last_name = ans.last_name.charAt(0).toUpperCase() + ans.last_name.slice(1);
			const params = [ _first_name, _last_name ];

			await employee.getRole().then(async (roles) => {
				await inquirer
					.prompt([
						{
							type: 'list',
							name: 'role',
							message: "What is the employee's role?",
							choices: roles,
							loop: false
						}
					])
					.then(async (selectedRole) => {
						const role = selectedRole.role;

						if (role[1] === 'Chief Executive Officer') {
							params.push(role[0]);
							await noManager(params);
							return;
						}

						params.push(role[0]);
						await employee.getManager().then(async (manager) => {
							await inquirer
								.prompt([
									{
										type: 'list',
										name: 'manager',
										message: 'Who is the manager?\n',
										choices: manager,
										loop: false
									}
								])
								.then((selectedManager) => {
									const mgr = selectedManager.manager;

									params.push(mgr);
									employee.addEmployee(params);
								}); // .then(selectedManager)
						}); // .then(manager)
					}); // .then(selectedRole)
			}); // .then(roles)
		}); // .then(ans)
};

const addDepartmentMenu = async () => {
	await inquirer
		.prompt([
			{
				type: 'input',
				name: 'department',
				message: 'What department do you want to add?',
				validate: (input) => {
					if (checkString(input)) {
						return true;
					} else {
						error(' Please enter a valid department name!');
					}
				}
			}
		])
		.then((ans) => {
			employee.addDepartment(ans.department);
		});
};

const addRoleMenu = async () => {
	await inquirer
		.prompt([
			{
				type: 'input',
				name: 'role',
				message: 'What role would you like to add?',
				validate: (input) => {
					if (checkString(input)) {
						return true;
					} else {
						error(' Please enter a valid department name!');
					}
				}
			},
			{
				type: 'input',
				name: 'salary',
				message: 'What is the salary for this role?',
				validate: (input) => {
					if (!isNaN(input)) {
						return true;
					} else {
						error(' Please digits only');
					}
				}
			}
		])
		.then(async (ans) => {
			const params = [ ans.role, ans.salary ];

			await employee.getDepartment(params).then(async (department) => {
				await inquirer
					.prompt([
						{
							type: 'list',
							name: 'department',
							message: 'What is the department?',
							choices: department,
							loop: false
						}
					])
					.then((selectedDepartment) => {
						// role_id, salary, department_id
						params.push(selectedDepartment.department[0]);

						employee.addRole(params);
					});
			});
		});
};

const updateEmployeeRoleMenu = async () => {
	await employee.getEmployee().then(async (names) => {
		await inquirer
			.prompt([
				{
					type: 'list',
					name: 'employee',
					message: 'Which employee do you want to update?',
					choices: names,
					loop: false
				}
			])
			.then(async (selectedEmployee) => {
				const temp = [];

				for (let i = 0; i < selectedEmployee.employee.length; i++) {
					temp.push(selectedEmployee.employee[i]);
				}

				await employee.getRole().then(async (role) => {
					await inquirer
						.prompt([
							{
								type: 'list',
								name: 'role',
								message: "What is the employee's role?",
								choices: role,
								loop: false
							}
						])
						.then((selectedRole) => {
							const roleId = selectedRole.role;
							const params = [];
							for (let i = 0; i < selectedRole.role.length; i++) {
								temp.push(selectedRole.role[i]);
							}

							if (roleId[1].match('Chief Executive Officer')) {
								temp.push(null);
								// params.push(temp)

								params.push(temp[3]); // roleId
								params.push(temp[5]); // manager = null
								params.push(temp[0]); // employee id
								params.push(temp[1]); // first name
								params.push(temp[2]); // last name
								params.push(temp[4]); // role name
								console.log(params);
								employee.addNoManager(params);
								return;
							}
							params.push(temp[3]); // roleId
							params.push(temp[0]); // employeeId

							params.push(temp[1]); // first name
							params.push(temp[2]); // last name
							params.push(temp[4]); // role name

							employee.updateEmployeeRole(params);
						});
				});
			});
	});
};

const updateEmployeeManagerMenu = async () => {
	await employee.getEmployee().then(async (employees) => {
		await inquirer
			.prompt([
				{
					type: 'list',
					name: 'name',
					choices: employees,
					loop: false
				}
			])
			.then(async (selectedEmployee) => {
				const params = [];
				const temp = [];
				temp.push(selectedEmployee.name[0]); // employee id
				await employee.getManager().then(async (manager) => {
					await inquirer
						.prompt([
							{
								type: 'list',
								name: 'manager',
								message: 'Who is the manager?',
								choices: manager,
								loop: false
							}
						])
						.then((selectedManager) => {
							temp.push(selectedManager.manager);
							console.log(temp);
							params.push(temp[1]);
							params.push(temp[0]);
							params.push(selectedEmployee.name[1]);
							params.push(selectedEmployee.name[2]);

							employee.updateEmployeeManager(params);
						});
				});
			});
	});
};

const updateEmployeeDepMenu = () => {
	getEmployee().then((employee) => {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'employee',
					message: 'Which employee do you want to update?',
					choices: employee,
					loop: false
				}
			])
			.then((selectedEmployee) => {
				const params = [];
				const employee = selectedEmployee.employee[0];
				params.push(employee);
			});
	});
};

const deleteEmployeeMenu = async () => {
	await getEmployee().then(async (names) => {
		await inquirer
			.prompt([
				{
					type: 'list',
					name: 'employee_name',
					message: 'Which employee do you want to delete?',
					choices: names,
					loop: false
				}
			])
			.then((selectedEmployee) => {
				console.log();
				employee.deleteEmployee(selectedEmployee.employee_name);
			});
	});
};

const deleteDepartmentMenu = async () => {
	await getDepartment().then(async (department) => {
		await inquirer
			.prompt([
				{
					type: 'list',
					name: 'department',
					message: 'Which department do you want to delete?',
					choices: department,
					loop: false
				}
			])
			.then((selectedDepartment) => {
				employee.deleteDepartment(selectedDepartment.department);
			});
	});
};

const deleteRoleMenu = async () => {
	await employee.getRole().then(async (roles) => {
		await inquirer
			.prompt([
				{
					type: 'list',
					name: 'role',
					message: 'What role do you want to delete?',
					choices: roles,
					loop: false
				}
			])
			.then((selectedRole) => {
				employee.deleteRole(selectedRole.role);
			});
	});
};

module.exports = {
	init
};