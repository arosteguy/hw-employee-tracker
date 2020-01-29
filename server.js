var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "momofuku2020!",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});
  
function runSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all employees",
      "View all departments",
      "View all managers",
      "Add an employee",
      "Add a department",
      "Add a role",
      "Remove an employee",
      "Update an employee's role ",
      "Update an employee's manager",
      "Exit"
    ]})
  

    .then(function (answer) {
      console.log(answer.action);
      switch (answer.action) {
        case "View all employees":
          employeeView();
          break;

        case "View all departments":
          departmentView();
          break;
          
        case "View all managers":
          managerView();
          break;

        case "Add an employee":
          employeeAdd();
          break;

          case "Add a department":
            departmentAdd();
            break;

          case "Add a role":
            roleAdd();
            break;

          case "Remove an employee":
            employeeRemove();
            break;

          case "Update an employee role":
            roleUpdate();
            break;
          
          case "Exit":
            connection.end();
            break;
      }
    });
}

function employeeView() {
  inquirer
    .prompt({
      name: "employeeView",
      type: "input",
      message: "Search for an employee by last name...",
    })
    .then(function (answer) {
      let query = "SELECT first_name, last_name, id FROM employee WHERE ?";
      connection.query(query,{last_name: answer.employeeView}, function (err, res) {
        // for (var i = 0; i < res.length; i++) {
        //   console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
          
        // }
        console.table(res);
        runSearch();
      } );
    });
}

function departmentView() {
  let query = "SELECT name FROM department";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
  });
}

function managerView () {
  var query = "SELECT id, first_name, last_name, FROM employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
    }
    runSearch();
  });
}

function employeeAdd () {
  inquirer
   .prompt({
     name: "employeeAdd",
     type: "input",
     message: ["To ADD an employee, enter the employee First Name then Last Name"]
   })

   .then(function (answer) {
     console.log(answer);
     let str = answer.employeeAdd;
     let firstAndLast = str.split(" ");
     console.log(firstAndLast);
     let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
     connection.query(query, [[firstAndLast]], function (err, res){
       runSearch();
     });
   })
}

function departmentAdd() {
  inquirer
   .prompt({
     name: "departmentAdd",
     type: "input",
     message: ["To ADD a department, enter the new department name"]
   })
   .then(function (answer) {
      console.log (answer);
      let str = answer.departmentAdd;
      let firstAndLast = str.split(" ");
      console.log(firstAndLast);
      let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLast]], function (err, res){
        runSearch();
      });
   })
}

function roleAdd() {
  inquirer
  .prompt({
    name: "title",
    type: "input",
    message: ["Enter the new role name"]
  })
  .then(function (answer) {
    let title = answer.title;

    inquirer
      .prompt({
        name: "salary",
        type: "input",
        message: ["Enter the salary for the new role"]
      })
      .then(function (answer) {
        let salary = answer.salary;

        inquirer
          .prompt({
            name: "department_id",
            type: "input",
            message: ["Enter the department id for the new role"]
          })
          .then (function (answer) {
            let department_id = answer.department_id;
            console.log(`title:  ${title} salary: ${salary} department id: ${department_id}`);
            let query = "INSERT INTO role (title, salary, department_id) VALUES ?";
            connection.query(query, [[[title, salary, department_id]]], function (err, res) {
              if (err) {
                console.log(err);
              }
              runSearch();
            });
          })
      })
    })
  }

function employeeRemove() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter their employee id",
    })
    .then(function (answer) {
      console.log(answer);
      let query = "DELETE FROM employee WHERE ?";
      let newId = Number (answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function (err, res) {
        runSearch();
      });
    });
}

function roleUpdate() {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "Enter employee id",
      })
      .then(function (answer) {
        let id = answer.id;
         inquirer
           .prompt({
             name: "roleId",
             type: "input",
             message: "Enter new role id",
           })
           .then(function (answer) {
             let roleId = answer.roleId;
             let query = "UPDATE employee SET role_id=?";
             connection.query(query, [roleId, id], function (err,res) {
               if (err) {
                 console.log(err);
                }
                runSearch();
            });    
        });
      });
}



        
    
  
    