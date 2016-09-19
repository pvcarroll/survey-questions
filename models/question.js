var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize;
var dbConnection;

if (process.env.NODE_ENV) {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
  dbConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  dbConnection.connect();

}

function foo() {
  return 'question.js';
}

module.exports = {
  foo: foo
};