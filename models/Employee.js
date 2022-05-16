const chalkAnimation = require("chalkercli");
const display = require("./Display");
const conn = require("../config/connection");
const cl = require("cli-color");

class Employee {
  viewAllEmployee() {
    const sql = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS dep,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS mgr
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ORDER BY employee.last_name`;

    // conn.execute(sql, (err, rows) => {
    //   if (err) throw err;
    //   console.log("");
    //   display.printAllEmployee(rows);
    // });
    conn
      .promise()
      .query(sql)
      .then(([rows]) => {
        display.printAllEmployee(rows);
      })
      .catch(console.log);
  }

  viewAllDepartment() {
    const sql = `SELECT * FROM department`;

    conn
      .promise()
      .query(sql)
      .then(([rows]) => {
        display.printAllDepartment(rows);
      })
      .catch(console.log);
  }

  viewAllRoles() {
    const sql = `SELECT role.id, role.title, department.name AS department
                FROM role
                INNER JOIN department ON role.department_id = department.id
                ORDER BY role.title ASC`;

    conn
      .promise()
      .query(sql)
      .then(([rows]) => {
        display.printAllRoles(rows);
      })
      .catch(console.log);
  }

  viewEmployeesByManager() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    WHERE role.title IN ('Manager', 'Department Manager', 'Chief Executive Officer')
    ORDER BY role.title ASC`;

    conn
      .promise()
      .query(sql)
      .then(([rows]) => {
        display.printEmployeeByManager(rows);
      })
      .catch(console.log);
  }

  addEmployee(params) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                 VALUES (?, ?, ?, ?)`;

    conn
      .promise()
      .query(sql, params)
      .then(() =>
        console.log(
          cl.blueBright.bgWhite(
            `${params[0]}, ${params[1]} added to the Employee directory`
          )
        )
      )
      .catch(console.log);
  }

  addDepartment(param) {
    const sql = `INSERT INTO department (name)
                VALUES (?)`;

    conn
      .promise()
      .query(sql, param)
      .then(() =>
        console.log(
          cl.blueBright.bgWhite(`${param} department added successfully`)
        )
      )
      .catch(console.log);
  }

  addRole(params) {
    const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;

    conn
      .promise()
      .query(sql, params)
      .then(() =>
        console.log(
          cl.green.bgWhite(`${params[0]} has been added as a new Role Title`)
        )
      )
      .catch(console.log);
  }

  getRole() {
    const sql = `SELECT role.id, role.title FROM role`;

    return new Promise((resolve, reject) => {
      conn.execute(sql, (err, data) => {
        if (err) throw err;
        const role = data.map(({ id, title }) => ({
          name: title,
          value: [id, title],
        }));
        if (err) {
          reject(err);
          return;
        }
        resolve(role);
      });
    });
  }

  getEmployee() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                ORDER BY employee.last_name ASC`;

    return new Promise((resolve, reject) => {
      conn.execute(sql, (err, data) => {
        if (err) throw err;
        const employee = data.map(
          ({ id, first_name, last_name, role_title }) => ({
            name: `${first_name}, ${last_name} - ${role_title}`,
            value: id,
          })
        );
        if (err) {
          reject(err);
          return;
        }
        resolve(employee);
      });
    });
  }
  getManager() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                WHERE role.title IN ('Department Manager','Manager', 'Chief Executive Officer')`;

    return new Promise((resolve, reject) => {
      conn.execute(sql, (err, data) => {
        if (err) throw err;
        const manager = data.map(
          ({ id, first_name, last_name, role_title }) => ({
            name: `${first_name} ${last_name} - ${role_title}`,
            value: id,
          })
        );
        if (err) {
          reject(err);
          return;
        }
        resolve(manager);
      });
    });
  }

  getDepartment() {
    const sql = `SELECT * FROM department`;

    return new Promise((resolve, reject) => {
      conn.execute(sql, (err, data) => {
        if (err) throw err;
        const department = data.map(({ id, name }) => ({
          name: `${name}`,
          value: [id, name],
        }));
        if (err) {
          reject(err);
          return;
        }
        resolve(department);
      });
    });
  }

  updateEmployeeRole(params) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

    conn
      .promise()
      .query(sql, params)
      .then(() => console.log(cl.blueBright.bgWhite(`employee role updated`)))
      .catch(console.log);
  }

  updateEmployeeManager(params) {
    const sql = `UPDATE employee SET manager_id = ? 
                WHERE id = ?`;

    conn
      .promise()
      .query(sql, params)
      .then(() =>
        console.log(cl.blueBright.bgWhite(`employee's manager updated`))
      )
      .catch(console.log);
  }

  deleteDepartment(param) {
    const sql = `DELETE FROM department
                WHERE id = ?`;

    conn
      .promise()
      .query(sql, param[0])
      .then(() =>
        console.log(cl.redBright.bgWhite(`${param[1]} department deleted.`))
      )
      .catch(console.log);
  }

  deleteRole(params) {
    const sql = `DELETE FROM role 
                WHERE id = ?`;

    conn
      .promise()
      .query(sql, params[0])
      .then(() =>
        console.log(cl.redBright.bgWhite(`${params[1]} role deleted successfully.`))
      )
      .catch(console.log);
  }

  exist() {
    let str = "\nExiting program...";
    const rainbow = chalkAnimation.karaoke(str);

    setInterval(() => {
      process.exit();
    }, 2000);
  }
}

module.exports = new Employee();
