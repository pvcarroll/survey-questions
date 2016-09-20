var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize;
var dbConnection;

function saveQuestion(questionText, answerChoices) {
  console.log('saveQuestion: ' + questionText + answerChoices);
  console.log('Sequelize = ' + Object.keys(Sequelize));

  if (process.env.NODE_ENV) {
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
    console.log('sequelize = ' + Object.keys(sequelize));
    // dbConnection = mysql.createConnection({
    //   host: process.env.MYSQL_HOST,
    //   user: process.env.MYSQL_USERNAME,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DATABASE
    // });
    // dbConnection.connect();

    const Question = sequelize.define('question', {
      questionText: Sequelize.STRING,
      answerChoices: Sequelize.ARRAY
    });
    console.log('Question = ' + Question);

    Question.sync().then(function() {
      console.log('Question.sync().then');
      const data = {
        question_text: questionText,
        answer_choices: answerChoices
      };
      Question.create(data).then(function(question) {
        console.dir(question);
      });
    });
    console.dir('SAVEQUESTION END');
  }

  return questionText + answerChoices;
}

module.exports = {
  saveQuestion: saveQuestion
};