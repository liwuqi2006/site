/**
 * Created by wuqili on 7/1/2017.
 */
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    password: "1592",
    database: "yihui"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Database is Connected!");
});

module.exports = con;

