const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "momofuku2020!",
    database: "employee_trackerDB"
});

connection.connect();
  
  

connection.query =util.promisify(connection.query);
module.exports = connection;