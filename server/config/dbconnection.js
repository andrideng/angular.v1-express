var mysql = require('mysql');
var env = require('dotenv').config().parsed;

var connection = mysql.createPool({

    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME

});
module.exports = connection;