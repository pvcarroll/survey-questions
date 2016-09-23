var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize;
var dbConnection;

function saveQuestion(questionText, answerChoices) {
  console.log('saveQuestion: ' + questionText + answerChoices);
  console.log("process.env.CLEARDB_DATABASE_URL = " + process.env.CLEARDB_DATABASE_URL);
  if (process.env.CLEARDB_DATABASE_URL) {
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
  } else {
    var localMysqlConfig = require("../config/localMysqlConfig");
    sequelize = new Sequelize(localMysqlConfig.database, localMysqlConfig.user, localMysqlConfig.password);
  }
  // dbConnection = mysql.createConnection({
  //   host: process.env.MYSQL_HOST,
  //   user: process.env.MYSQL_USERNAME,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE
  // });
  // dbConnection.connect();

  const Question = sequelize.define('question', {
    text: Sequelize.STRING
  });
  const AnswerChoice = sequelize.define('answer_choice', {
    answer: Sequelize.STRING
  });
  Question.hasMany(AnswerChoice);
  AnswerChoice.belongsTo(Question);

  console.log('Question = ' + Question);
  console.log('AnswerChoice = ' + AnswerChoice);

  Question.sync().then(function() {
    console.log('Question.sync().then');
    const data = {
      text: questionText,
    };
    Question.create(data).then(function(question) {
      console.dir("QUESTION = " + question);
    });
  });
  console.log("answerChoices = " + answerChoices);
  console.log("answerChoices[0] = " + answerChoices[0]);
  console.log("answerChoices[1] = " + answerChoices[1]);
  AnswerChoice.sync().then(function() {
    console.log('AnswerChoice.sync().then');
    console.log("answerChoices[i] = " + answerChoices);
    var data = {
      answer: answerChoices[0]
    };
    AnswerChoice.create(data).then(function(answer_choice) {
      console.dir("ANSWER_CHOICE0 = " + answer_choice);
    });
    data = {
      answer: answerChoices[1]
    };
    AnswerChoice.create(data).then(function(answer_choice) {
      console.dir("ANSWER_CHOICE1 = " + answer_choice);
    });
  });
  console.dir('SAVEQUESTION END');

  return questionText + answerChoices;
}

module.exports = {
  saveQuestion: saveQuestion
};