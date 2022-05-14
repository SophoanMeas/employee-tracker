const { Table } = require("console-table-printer");

class Display{

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
    
}

module.exports = new Display();