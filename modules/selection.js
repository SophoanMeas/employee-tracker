const chalkAnimation = require("chalkercli");
const conn = require("../config/connection");
const { Table } = require("console-table-printer");

class Selection {
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

    conn.execute(sql, (err, rows) => {
      if (err) throw err;
      console.log("");
      this.printAllEmployee(rows);
    });
  }

  viewEmployeeByDepartment() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, department.name AS dep
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY department.name ASC`;

    conn.execute(sql, (err, rows) => {
      if (err) throw err;
      console.log("");
      this.printEmployeeByDepartment(rows);
    });
  }

  addEmployee(){
    conn.execute(sql, (err, rows) => {
        if (err) throw err;
        console.log("");
        this.printAllEmployee(rows);
      });
  }

  printEmployeeByDepartment(rows) {
    const p = new Table({
      title: "List of Employees By Department",
      columns: [
        { name: "id", title: "ID", alignment: "left" },
        {
          name: "first_name",
          title: "First Name",
          alignment: "left",
          color: "green",
        },
        {
          name: "last_name",
          title: "Last Name",
          alignment: "left",
          color: "green",
        },
        {
          name: "department",
          title: "Department",
          alignment: "center",
          color: "cyan",
        },
      ],
    });

    for (let i = 0; i < rows.length; i++) {
      p.addRow({
        id: rows[i].id,
        first_name: rows[i].first_name,
        last_name: rows[i].last_name,
        department: rows[i].dep,
      });
    }

    p.printTable();
  }

  printAllEmployee(rows) {
    const p = new Table({
      title: "List of Employees",
      columns: [
        { name: "id", title: "ID", alignment: "left" },
        {
          name: "first_name",
          title: "First Name",
          alignment: "left",
          color: "green",
        },
        {
          name: "last_name",
          title: "Last Name",
          alignment: "left",
          color: "green",
        },
        { name: "title", title: "Title", alignment: "center", color: "yellow" },
        {
          name: "department",
          title: "Department",
          alignment: "center",
          color: "orange",
        },
        { name: "salary", title: "Salary", alignment: "left" },
        {
          name: "manager",
          title: "Manager",
          alignment: "center",
          color: "cyan",
        },
      ],
    });

    for (let i = 0; i < rows.length; i++) {
      p.addRow({
        id: rows[i].id,
        first_name: rows[i].first_name,
        last_name: rows[i].last_name,
        title: rows[i].title,
        department: rows[i].dep,
        salary: `$${rows[i].salary}`,
        manager: rows[i].mgr,
      });
    }

    p.printTable();
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
