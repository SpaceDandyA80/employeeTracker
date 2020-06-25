const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
//connect to topSongsDB using mysql module

var conn = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "SpaceDandyA80",
  database: "emp_track",
});

conn.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  runSearch();
});
function runSearch() {
  inquirer
    .prompt({
      // prompts user what their course of action is
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "add an employee to your business",
        "add a department to your business",
        "add a role to your department",
        "update employee",
        "remove employee",
        "view all employees",
        "view all departments",
        "view all roles",
        "exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "add an employee to your business":
          addEmp();
          break;
        case "add a department to your business":
          addDepart();
          break;

        case "add a role to your department":
          addRole();
          break;
        case "update employee":
          updateEmployee();
          break;
        case "remove employee":
          removeEmployee();
          break;
        //choosing employee case to view all employees
        case "view all employees":
          viewAllEmployees();
          break;
        case "view all departments":
          viewAllDepartments();
          break;
        case "view all roles":
          viewAllRoles();
          break;
        case "exit":
          conn.end();
          break;
      }
    });
}

function addEmp() {
  // prompts user for information on their new employee
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "what is the first name of your employee?",
      },
      {
        name: "lastname",
        type: "input",
        message: "what is the last name of your employee?",
      },
      {
        name: "role",
        type: "input",
        message: "what role number does your employee have?",
      },
      {
        name: "department",
        type: "input",
        message: "what department is your employee in?",
      },
    ])
    .then(function (EMP) {
      // ES6 object destructoring
      const { firstname, lastname, role, department } = EMP;
      // console.log(firstname, lastname, role, department);

      var query = `insert into employee (first_name, last_name, role_id, manager_id) values ("${firstname}", "${lastname}", ${role}, ${department})`;
      // conn.query("answer.employee")
      //grabs inquirer prompt for name and stores it in prompt and i would call it back with a query
      // conn.query(query, {first_name: answer.name})

      conn.query(query, function (err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}
// prompts user for information on their new department
function addDepart() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "what role does your employee have?",
      },
      {
        name: "department",
        type: "input",
        message: "what is the name of your new department?",
      },
    ])
    .then(function (DEP) {
      // ES6 object destructoring
      const { id, department } = DEP;

      // nameD is the name for column of a new department in the sql database
      var query = `insert into department (id, nameD) values ( ${id}, "${department}")`;

      conn.query(query, function (err, res) {
        if (err) throw err;
        // viewAllDepartments();
        runSearch();
      });
    });
}
// prompts user for information on their new role
function addRole() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "what id does your employee have?",
      },
      {
        name: "title",
        type: "input",
        message: "what title does your employee have?",
      },
      {
        name: "salary",
        type: "input",
        message: "what will be the salary of your employee?",
      },
      {
        name: "department",
        type: "input",
        message: "what is the id of the department?",
      },
    ])
    .then(function (ROLE) {
      // ES6 object destructoring
      const { id, title, salary, department } = ROLE;
      var query = `insert into roles (id, title, salary, department_id) values ( ${id}, "${title}", ${salary}, ${department})`;

      conn.query(query, function (err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}

function removeEmployee() {
    //not fully functional
  var query = `DELETE FROM employee ("id") WHERE id = ${id}`;
  conn.query(query, function (err, res) {
    if (err) throw err;
    console.table(viewAllEmployees());
  });
}

function updateEmployee() {
  //     var query("UPDATE employee SET plan = ? WHERE id = ?";
  // conn.query(query, function (err,res ){
    // if (err) throw err
  //})
}

// viewAllRoles(); functionality to view all of the database of roles
function viewAllRoles() {
  var query = "select * from roles";
  conn.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

// viewAllDepartments();
function viewAllDepartments() {
  var query = "select * from department";
  conn.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

// viewAllEmployees();
function viewAllEmployees() {
  var query = "select * from employee";
  conn.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
