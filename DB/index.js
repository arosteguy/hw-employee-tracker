const connection = require("./connection");
class DB {
    constructor(connection){
        this.connection = connection;
    }



// function employeeView() {
//     inquirer
//       .prompt({
//         name: "employeeView",
//         type: "input",
//         message: "Search for an employee by last name...",
//       })
//       .then(function (answer) {
//         let query = "SELECT first_name, last_name, id FROM employee WHERE ?";
//         connection.query(query,{last_name: answer.employeeView}, function (err, res) {
//           // for (var i = 0; i < res.length; i++) {
//           //   console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
            
//           // }
//           console.table(res);
//           runSearch();
//         } );
//       });
//   }
  
//   function departmentView() {
//     let query = "SELECT name FROM department";
//     connection.query(query, function (err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].name);
//       }
//     });
//   }
  
//   function managerView () {
//     var query = "SELECT id, first_name, last_name, FROM employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
//     connection.query(query, function (err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
//       }
//       runSearch();
//     });
//   }
  
//   function employeeAdd () {
//     inquirer
//      .prompt({
//        name: "employeeAdd",
//        type: "input",
//        message: ["To ADD an employee, enter the employee First Name then Last Name"]
//      })
  
//      .then(function (answer) {
//        console.log(answer);
//        let str = answer.employeeAdd;
//        let firstAndLast = str.split(" ");
//        console.log(firstAndLast);
//        let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
//        connection.query(query, [[firstAndLast]], function (err, res){
//          runSearch();
//        });
//      })
//   }
  
//   function departmentAdd() {
//     inquirer
//      .prompt({
//        name: "departmentAdd",
//        type: "input",
//        message: ["To ADD a department, enter the new department name"]
//      })
//      .then(function (answer) {
//         console.log (answer);
//         let str = answer.departmentAdd;
//         let firstAndLast = str.split(" ");
//         console.log(firstAndLast);
//         let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
//         connection.query(query, [[firstAndLast]], function (err, res){
//           runSearch();
//         });
//      })
//   }
  
//   function roleAdd() {
//     inquirer
//     .prompt({
//       name: "title",
//       type: "input",
//       message: ["Enter the new role name"]
//     })
//     .then(function (answer) {
//       let title = answer.title;
  
//       inquirer
//         .prompt({
//           name: "salary",
//           type: "input",
//           message: ["Enter the salary for the new role"]
//         })
//         .then(function (answer) {
//           let salary = answer.salary;
  
//           inquirer
//             .prompt({
//               name: "department_id",
//               type: "input",
//               message: ["Enter the department id for the new role"]
//             })
//             .then (function (answer) {
//               let department_id = answer.department_id;
//               console.log(`title:  ${title} salary: ${salary} department id: ${department_id}`);
//               let query = "INSERT INTO role (title, salary, department_id) VALUES ?";
//               connection.query(query, [[[title, salary, department_id]]], function (err, res) {
//                 if (err) {
//                   console.log(err);
//                 }
//                 runSearch();
//               });
//             })
//         })
//       })
//     }
  
//   function employeeRemove() {
//     inquirer
//       .prompt({
//         name: "employeeRemove",
//         type: "input",
//         message: "To REMOVE an employee, enter their employee id",
//       })
//       .then(function (answer) {
//         console.log(answer);
//         let query = "DELETE FROM employee WHERE ?";
//         let newId = Number (answer.employeeRemove);
//         console.log(newId);
//         connection.query(query, { id: newId }, function (err, res) {
//           runSearch();
//         });
//       });
//   }
  
//   function roleUpdate() {
//       inquirer
//         .prompt({
//           name: "id",
//           type: "input",
//           message: "Enter employee id",
//         })
//         .then(function (answer) {
//           let id = answer.id;
//            inquirer
//              .prompt({
//                name: "roleId",
//                type: "input",
//                message: "Enter new role id",
//              })
//              .then(function (answer) {
//                let roleId = answer.roleId;
//                let query = "UPDATE employee SET role_id=?";
//                connection.query(query, [roleId, id], function (err,res) {
//                  if (err) {
//                    console.log(err);
//                   }
//                   runSearch();
//               });    
//           });
//         });
//   }

findAllEmployees() {
  return this.connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  );
}

// Find all employees except the given employee id
findAllPossibleManagers(employeeId) {
  return this.connection.query(
    "SELECT id, first_name, last_name FROM employee WHERE id != ?",
    employeeId
  );
}

// Create a new employee
createEmployee(employee) {
  return this.connection.query("INSERT INTO employee SET ?", employee);
}

// Remove an employee with the given id
removeEmployee(employeeId) {
  return this.connection.query(
    "DELETE FROM employee WHERE id = ?",
    employeeId
  );
}

// Update the given employee's role
updateEmployeeRole(employeeId, roleId) {
  return this.connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [roleId, employeeId]
  );
}

// Update the given employee's manager
updateEmployeeManager(employeeId, managerId) {
  return this.connection.query(
    "UPDATE employee SET manager_id = ? WHERE id = ?",
    [managerId, employeeId]
  );
}

// Find all roles, join with departments to display the department name
findAllRoles() {
  return this.connection.query(
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
  );
}

// Create a new role
createRole(role) {
  return this.connection.query("INSERT INTO role SET ?", role);
}

// Remove a role from the db
removeRole(roleId) {
  return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
}

// Find all departments, join with employees and roles and sum up utilized department budget
findAllDepartments() {
  return this.connection.query(
    "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
  );
}

// Create a new department
createDepartment(department) {
  return this.connection.query("INSERT INTO department SET ?", department);
}

// Remove a department
removeDepartment(departmentId) {
  return this.connection.query(
    "DELETE FROM department WHERE id = ?",
    departmentId
  );
}

// Find all employees in a given department, join with roles to display role titles
findAllEmployeesByDepartment(departmentId) {
  return this.connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
    departmentId
  );
}

// Find all employees by manager, join with departments and roles to display titles and department names
findAllEmployeesByManager(managerId) {
  return this.connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
    managerId
  );
}
}

  module.exports = new DB(connection);