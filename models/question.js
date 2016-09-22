var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize;
var dbConnection;

function saveQuestion(questionText, answerChoices) {
  console.log('saveQuestion: ' + questionText + answerChoices);
  console.log("process.env.CLEARDB_DATABASE_URL = " + process.env.CLEARDB_DATABASE_URL);
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
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
  for (var i = 0; i < answerChoices.length; i++) {
    AnswerChoice.sync().then(function() {
      const i = i;
      console.log('AnswerChoice.sync().then');
      console.log("arguments  = " + arguments);
      console.log("answerChoices[i] = " + answerChoices[i]);
      const data = {
        answer: answerChoices[i]
      };
      AnswerChoice.create(data).then(function(answer_choice) {
        console.dir("ANSWER_CHOICE = " + answer_choice);
      });
    });
  }
  console.dir('SAVEQUESTION END');

  return questionText + answerChoices;
}

module.exports = {
  saveQuestion: saveQuestion
};