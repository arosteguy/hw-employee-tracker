DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
id INT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role(
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL (10,2),
department_id INT
);

CREATE TABLE employee(
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id int
);

INSERT INTO department(id, name)
VALUES (1,"Research and Development");
 INSERT INTO department (id, name)
 VALUES (2,"Quality Assurance"),
 (3,"Sales and Marketing"),
 (4,"Accounting");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Analyst", 150000.00, 2), (2, "Associate", 125000.00,2), (3, "Auditor", 150000.00,2);
(4, "Development Manager", 175000.00, 1), (5, "Research and Development Engineer", 15000.00, 1);
(6, "Sales Manager", 120000.00, 3), (7, "Sales", 115000.00, 3), (8, "Head Accountant", 125000.00, 4);


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
 INSERT INTO employee

VALUES (200, "Leslie", "Knope", 1, NULL), (201, "April", "Ludgate", 2, 20), (202, "Ann", "Perkins", 3, 20), (100, "Ron", "Swanson", 4, null),
(101, "Jerry", "Gergich", 5, 10), (300, "Tom", "Haverford", 6, null), (301, "Donna", "Meagle", 7, 30), (400, "Andy", "Dwyer", 8, null);

SELECT * FROM employee_trackerDB.role;