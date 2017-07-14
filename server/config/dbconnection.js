var mysql = require('mysql');
var env = require('dotenv').config().parsed;

var connection = mysql.createPool({

    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

});
module.exports = connection;