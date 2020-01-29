var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "momofuku2020!",
    database: "ice_creamDB"
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
        for (var i = 0; i < res.length; i++) {
          console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);

        }
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
     let query = 
   })
}
    
  
    