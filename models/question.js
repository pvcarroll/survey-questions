var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize;
var dbConnection;

function saveQuestion(question, answerChoices) {
  console.log('saveQuestion: ' + question + answerChoices);
  if (process.env.NODE_ENV) {
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
    console.log('sequelize = ' + sequelize);
    // dbConnection = mysql.createConnection({
    //   host: process.env.MYSQL_HOST,
    //   user: process.env.MYSQL_USERNAME,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DATABASE
    // });
    // dbConnection.connect();

    const Question = sequelize.define('question', {
      question: {
        type: Sequelize.STRING,
        field: 'question'
      },
      answerChoices: {
        type: Sequelize.ARRAY,
        field: 'answer_choices'
      }
    });

    Question.sync().then(function() {
      const data = {
        question: question,
        answer_choices: answerChoices
      };
      Question.create(data).then(function(question) {
        console.dir(question);
      });
    });
  }

  return question + answerChoices;
}

module.exports = {
  saveQuestion: saveQuestion
};