const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

var mysqlConnection = mysql.createConnection({
    socketPath: "/var/run/mysqld/mysqld.sock",
    user: "root",
    password: "testing123",
    database: "mediaape",
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected!");
    } else {
        throw err;
    }
})

module.exports = mysqlConnection;