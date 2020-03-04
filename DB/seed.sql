USE employee_trackerDB

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