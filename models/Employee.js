const chalkAnimation = require("chalkercli");
const display = require("./Display");
const conn = require("../config/connection");

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
    conn.promise().query(sql)
    .then(([rows]) => {
      console.log("");
      display.printAllEmployee(rows);
    })
    .catch(console.log)
    .then( () => conn.end());
  }

  viewEmployeeByDepartment() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS dep
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY department.name ASC`;

    conn.promise().query(sql)
    .then(([rows]) => {
      console.log("");
      display.printEmployeeByDepartment(rows);
    })
    .catch(console.log)
    .then( () => conn.end());
  }

  addEmployee() {
    // const sql = ``;
    // conn.execute(sql, (err, rows) => {
    //     if (err) throw err;
    //     console.log("");
    //     // this.printAllEmployee(rows);
    //   });
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
