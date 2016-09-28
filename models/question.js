var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize;

function saveQuestion(questionText, answerChoices) {

  if (process.env.CLEARDB_DATABASE_URL) {
    // Production
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
  } else {
    // Development
    const localMysqlConfig = require("../config/localMysqlConfig");
    sequelize = new Sequelize(localMysqlConfig.database, localMysqlConfig.user, localMysqlConfig.password);
  }

  const Question = sequelize.define('question', {
    text: Sequelize.STRING
  });
  const AnswerChoice = sequelize.define('answer_choice', {
    answer: Sequelize.STRING
  });
  Question.hasMany(AnswerChoice);
  AnswerChoice.belongsTo(Question, { foreignKey: "questionId" });

  sequelize.sync().then(function() {
  });

  console.log('Question = ' + Question);
  console.log('AnswerChoice = ' + AnswerChoice);

  var questionId;

  Question.sync().then(function() {
    console.log('Question.sync().then');
    const data = {
      text: questionText
    };
    Question.create(data).then(function(question) {
      console.dir("QUESTION = " + question);

      AnswerChoice.sync().then(function() {
        var data;
        answerChoices.forEach(function(answerChoice, i) {
          data = {
            answer: answerChoice,
            questionId: question.id
          };
          var includeObject = {
            include: [Question]
          };
          AnswerChoice.create(data, includeObject).then(function(answer_choice) {
            console.dir("ANSWER_CHOICE = " + answer_choice);
          });
        });
      });
    });
  });

  return questionText + answerChoices;
}

module.exports = {
  saveQuestion: saveQuestion
};