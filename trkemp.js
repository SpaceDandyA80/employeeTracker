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
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "add an employee to your business",
        "add a department to your business",
        "add a role to your department",
        "update employee",
        "remove employee",
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
/// view all emp case to view r\employees
        case "add a role to your department":
          addRole();
          break;

        case "update employee":
          updateEmployee();
          break;

        case "remove employee":
          removeEmployee();
          break;

        case "exit":
          conn.end();
          break;
      }
    });
}

function addEmp() {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "input",
        message: "what is the name of your employee?",
      },
      {
        name: "role",
        type: "input",
        message: "what role does your employee have?",
      },
      {
        name: "department",
        type: "input",
        message: "what department is your employee in?",
      },
    ])
    .then(function (EMP) {
        // ES6 object destructoring
        const {employee, role, department} = EMP;

      // change prompt from to employee to include first name and last name
      console.log(employee, role, department);

      var query = `insert into employee (first_name, role_id, manager_id) values ("${employee}", ${role}, ${department})`;
      // conn.query("answer.employee")
      //grabs inquirer prompt for name and stores it in prompt and i would call it back with a query
     // conn.query(query, {first_name: answer.name})

      conn.query(query, function(err, res){
          if(err) throw err;
          viewAllEmployees();
          //runSearch();
      })
      // first_name VARCHAR(30),
      // last_name VARCHAR(30),
      // role_id int,
      // manager_id int

      // var query = "SELECT position, song, year FROM top5000 WHERE ?";
      // conn.query(query, { artist: answer.artist }, function (err, res) {
      //     for (var i = 0; i < res.length; i++) {
      //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
      //     }
      //     runSearch();
      // });
    });
}

function viewAllEmployees(){
    var query = "select * from employee";
    conn.query(query, function(err, res){
        if(err) throw err;
        console.table(res)
    })
}
