const { Table } = require("console-table-printer");

class Display {
  printEmployeeByDepartment(rows) {
    console.log("\n");
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
    console.log("\n");
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

  printAllDepartment(rows) {
    console.log("\n");
    const p = new Table({
      title: "List of Departments",
      columns: [
        {
          name: "title",
          title: "Department Name",
          alignment: "left",
          color: "green",
        },
      ],
    });

    for (let i = 0; i < rows.length; i++) {
      p.addRow({
        title: rows[i].name,
      });
    }

    p.printTable();
  }

  printAllRoles(rows) {
    console.log("\n");
    const p = new Table({
      title: "The List of Roles",
      columns: [
        {
          name: "role_title",
          title: "Role Title",
          alignment: "left",
          color: "green",
        },
        {
          name: "department_name",
          title: "Department",
          alignment: "center",
          color: "yellow",
        },
      ],
    });

    for (let i = 0; i < rows.length; i++) {
      p.addRow({
        role_title: rows[i].title,
        department_name: rows[i].department,
      });
    }

    p.printTable();
  }

  printEmployeeByManager(rows) {
    console.log("\n");
    const p = new Table({
      title: "List of Employees By Manager",
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
        manager: rows[i].manager,
      });
    }

    p.printTable();
  }

  printEmployeeByDepartment(rows) {
    console.log("\n");
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
          color: "magenta",
        },
      ],
    });

    for (let i = 0; i < rows.length; i++) {
      p.addRow({
        id: rows[i].id,
        first_name: rows[i].first_name,
        last_name: rows[i].last_name,
        department: rows[i].department,
      });
    }

    p.printTable();
  }

  printBudget(rows) {
    console.log("\n");
    const p = new Table({
      title: "Total Utilized Budget of a Department",
      columns: [
        {
          name: "role_title",
          title: "Role Title",
          alignment: "center",
          color: "green",
        },
        {
          name: "salary",
          title: "Salary",
          alignment: "left",
        },
        {
          name: "department",
          title: "Department",
          alignment: "left",
          color: "cyan",
        },
        {
          name: "total_budget",
          title: "Total Budget",
          alignment: "left",
          color: "yellow",
        },
      ],
    });

    for (let i = 0; i < rows.length; i++) {
      p.addRow({
        role_title: rows[i].title,
        salary: `$${rows[i].salary}`,
        department: rows[i].department,
        total_budget: `$${rows[i].total_budget}`,
      });
    }
    p.printTable();
  }
}

module.exports = new Display();
