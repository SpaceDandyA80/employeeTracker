const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
//connect to topSongsDB using mysql module

var conn = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "SpaceDandyA80",
    database: "emp_track"
});

conn.connect(err => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    runSearch();
});