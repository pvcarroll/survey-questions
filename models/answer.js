var mysql = require("mysql");
var Sequelize = require("sequelize");
const AnswerChoiceModel = require("./question.js").AnswerChoice;

var sequelize;
if (process.env.CLEARDB_DATABASE_URL) {
  // Production
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  // Development
  const localMysqlConfig = require("../config/localMysqlConfig");
  sequelize = new Sequelize(localMysqlConfig.database, localMysqlConfig.user, localMysqlConfig.password);
}

function saveAnswer(answerChoice, questionId) {

  AnswerChoiceModel.find({ where: { questionId: questionId, answer: answerChoice }}).then(function(answerChoiceResult) {
    answerChoiceResult.increment("count");
  });
}

module.exports = {
  saveAnswer
};