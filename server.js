const { prompt } = require("inquirer");
const DB = require("./DB");
require("console.table");


  
// function runSearch() {
//   inquirer
//     .prompt({
//       type: "list",
//       name: "action",
//       message: "What would you like to do?",
//       choices: ["View all employees",
//       "View all departments",
//       "View all managers",
//       "Add an employee",
//       "Add a department",
//       "Add a role",
//       "Remove an employee",
//       "Update an employee's role ",
//       "Update an employee's manager",
//       "Exit"
//     ]})
  

//     .then(function (answer) {
//       console.log(answer.action);
//       switch (answer.action) {
//         case "View all employees":
//           employeeView();
//           break;

//         case "View all departments":
//           departmentView();
//           break;
          
//         case "View all managers":
//           managerView();
//           break;

//         case "Add an employee":
//           employeeAdd();
//           break;

//           case "Add a department":
//             departmentAdd();
//             break;

//           case "Add a role":
//             roleAdd();
//             break;

//           case "Remove an employee":
//             employeeRemove();
//             break;

//           case "Update an employee role":
//             roleUpdate();
//             break;
          
//           case "Exit":
//             connection.end();
//             break;
//       }
//     });
// }

// function employeeView() {
//   inquirer
//     .prompt({
//       name: "employeeView",
//       type: "input",
//       message: "Search for an employee by last name...",
//     })
//     .then(function (answer) {
//       let query = "SELECT first_name, last_name, id FROM employee WHERE ?";
//       connection.query(query,{last_name: answer.employeeView}, function (err, res) {
//         // for (var i = 0; i < res.length; i++) {
//         //   console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
          
//         // }
//         console.table(res);
//         runSearch();
//       } );
//     });
// }

// function departmentView() {
//   let query = "SELECT name FROM department";
//   connection.query(query, function (err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].name);
//     }
//   });
// }

// function managerView () {
//   var query = "SELECT id, first_name, last_name, FROM employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
//   connection.query(query, function (err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
//     }
//     runSearch();
//   });
// }

// function employeeAdd () {
//   inquirer
//    .prompt({
//      name: "employeeAdd",
//      type: "input",
//      message: ["To ADD an employee, enter the employee First Name then Last Name"]
//    })

//    .then(function (answer) {
//      console.log(answer);
//      let str = answer.employeeAdd;
//      let firstAndLast = str.split(" ");
//      console.log(firstAndLast);
//      let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
//      connection.query(query, [[firstAndLast]], function (err, res){
//        runSearch();
//      });
//    })
// }

// function departmentAdd() {
//   inquirer
//    .prompt({
//      name: "departmentAdd",
//      type: "input",
//      message: ["To ADD a department, enter the new department name"]
//    })
//    .then(function (answer) {
//       console.log (answer);
//       let str = answer.departmentAdd;
//       let firstAndLast = str.split(" ");
//       console.log(firstAndLast);
//       let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
//       connection.query(query, [[firstAndLast]], function (err, res){
//         runSearch();
//       });
//    })
// }

// function roleAdd() {
//   inquirer
//   .prompt({
//     name: "title",
//     type: "input",
//     message: ["Enter the new role name"]
//   })
//   .then(function (answer) {
//     let title = answer.title;

//     inquirer
//       .prompt({
//         name: "salary",
//         type: "input",
//         message: ["Enter the salary for the new role"]
//       })
//       .then(function (answer) {
//         let salary = answer.salary;

//         inquirer
//           .prompt({
//             name: "department_id",
//             type: "input",
//             message: ["Enter the department id for the new role"]
//           })
//           .then (function (answer) {
//             let department_id = answer.department_id;
//             console.log(`title:  ${title} salary: ${salary} department id: ${department_id}`);
//             let query = "INSERT INTO role (title, salary, department_id) VALUES ?";
//             connection.query(query, [[[title, salary, department_id]]], function (err, res) {
//               if (err) {
//                 console.log(err);
//               }
//               runSearch();
//             });
//           })
//       })
//     })
//   }

// function employeeRemove() {
//   inquirer
//     .prompt({
//       name: "employeeRemove",
//       type: "input",
//       message: "To REMOVE an employee, enter their employee id",
//     })
//     .then(function (answer) {
//       console.log(answer);
//       let query = "DELETE FROM employee WHERE ?";
//       let newId = Number (answer.employeeRemove);
//       console.log(newId);
//       connection.query(query, { id: newId }, function (err, res) {
//         runSearch();
//       });
//     });
// }

// function roleUpdate() {
//     inquirer
//       .prompt({
//         name: "id",
//         type: "input",
//         message: "Enter employee id",
//       })
//       .then(function (answer) {
//         let id = answer.id;
//          inquirer
//            .prompt({
//              name: "roleId",
//              type: "input",
//              message: "Enter new role id",
//            })
//            .then(function (answer) {
//              let roleId = answer.roleId;
//              let query = "UPDATE employee SET role_id=?";
//              connection.query(query, [roleId, id], function (err,res) {
//                if (err) {
//                  console.log(err);
//                 }
//                 runSearch();
//             });    
//         });
//       });
// }

// function init() {
//   const logoText = logo({ name: "Employee Manager" }).render();

//   console.log(logoText);

//   loadMainPrompts();}


async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    case "VIEW_EMPLOYEES_BY_MANAGER":
      return viewEmployeesByManager();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "UPDATE_EMPLOYEE_MANAGER":
      return updateEmployeeManager();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "REMOVE_DEPARTMENT":
      return removeDepartment();
    case "VIEW_ROLES":
      return viewRoles();
    case "ADD_ROLE":
      return addRole();
    case "REMOVE_ROLE":
      return removeRole();
    default:
      return quit();
  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);

  const employees = await db.findAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewEmployeesByManager() {
  const managers = await db.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which employee do you want to see direct reports for?",
      choices: managerChoices
    }
  ]);

  const employees = await db.findAllEmployeesByManager(managerId);

  console.log("\n");

  if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
  } else {
    console.table(employees);
  }

  loadMainPrompts();
}

async function removeEmployee() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log("Removed employee from the database");

  loadMainPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

async function updateEmployeeManager() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's manager do you want to update?",
      choices: employeeChoices
    }
  ]);

  const managers = await db.findAllPossibleManagers(employeeId);

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message:
        "Which employee do you want to set as manager for the selected employee?",
      choices: managerChoices
    }
  ]);

  await db.updateEmployeeManager(employeeId, managerId);

  console.log("Updated employee's manager");

  loadMainPrompts();
}

async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function addRole() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await db.createRole(role);

  console.log(`Added ${role.title} to the database`);

  loadMainPrompts();
}

async function removeRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role do you want to remove? (Warning: This will also remove employees)",
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);

  console.log("Removed role from the database");

  loadMainPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  await db.createDepartment(department);

  console.log(`Added ${department.name} to the database`);

  loadMainPrompts();
}

async function removeDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message:
      "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
    choices: departmentChoices
  });

  await db.removeDepartment(departmentId);

  console.log(`Removed department from the database`);

  loadMainPrompts();
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
