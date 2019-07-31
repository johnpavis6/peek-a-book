const mysql = require('mysql');
const options = require('../config/mysql').mysql;
const connection = mysql.createConnection(options);
connection.connect();
exports.connection = connection;