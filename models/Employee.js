const chalkAnimation = require("chalkercli");
const display = require("./Display");
const conn = require("../config/connection");
const cl = require("cli-color");
class Selection {
  async viewAllEmployee() {
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
        console.log("");
        display.printAllEmployee(rows);
      })
      .catch(console.log)
      .then(() => conn.end());
  }

  viewEmployeeByDepartment() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS dep
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY department.name ASC`;

    conn
      .promise()
      .query(sql)
      .then(([rows]) => {
        console.log("");
        display.printEmployeeByDepartment(rows);
      })
      .catch(console.log)
      .then(() => conn.end());
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
      .catch(console.log)
      .then(() => conn.end());
  }

  getRole() {
    const sql = `SELECT role.id, role.title FROM role`;

    return new Promise((resolve, reject) => {
      conn.execute(sql, (err, data) => {
        if (err) throw err;
        const role = data.map(({ id, title }) => ({ name: title, value: id }));
        if (err) {
          reject(err);
          return;
        }
        resolve(role);
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
            name: `${first_name} ${last_name} \t ${role_title}`,
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

  exist() {
    let str = "\nExiting program...";
    const rainbow = chalkAnimation.karaoke(str);

    setInterval(() => {
      process.exit();
    }, 1500);
  }
}

module.exports = new Selection();
