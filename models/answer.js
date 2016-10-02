var mysql = require("mysql");
var Sequelize = require("sequelize");

var sequelize;
if (process.env.CLEARDB_DATABASE_URL) {
  // Production
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  // Development
  const localMysqlConfig = require("../config/localMysqlConfig");
  sequelize = new Sequelize(localMysqlConfig.database, localMysqlConfig.user, localMysqlConfig.password);
}
const Answer = sequelize.define("answer", {
  answer: Sequelize.STRING,
  questionId: Sequelize.STRING
});

function saveAnswer(answer, questionId) {

  Answer.sync().then(function() {
    var data = {
      answer: answer,
      questionId: questionId
    };
    Answer.create(data).then(function(answer) {
      console.log("ANSWER = " + JSON.stringify(answer));
    });
  });
}

module.exports = {
  saveAnswer
};