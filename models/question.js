var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize;
if (process.env.CLEARDB_DATABASE_URL) {
  // Production
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  // Development
  const localMysqlConfig = require('../config/localMysqlConfig');
  sequelize = new Sequelize(localMysqlConfig.database, localMysqlConfig.user, localMysqlConfig.password);
}
const Question = sequelize.define('question', {
  text: Sequelize.STRING
});
const AnswerChoice = sequelize.define('answer_choice', {
  answer: Sequelize.STRING,
  count: Sequelize.INTEGER
});
Question.hasMany(AnswerChoice);
AnswerChoice.belongsTo(Question, { foreignKey: 'questionId' });

sequelize.sync().then(function() {
});

function saveQuestion(questionText, answerChoices) {

  Question.sync().then(function() {
    const data = {
      text: questionText
    };
    Question.create(data).then(function(question) {
      console.dir('QUESTION = ' + question);

      AnswerChoice.sync().then(function() {
        var data;
        answerChoices.forEach(function(answerChoice) {
          data = {
            answer: answerChoice,
            questionId: question.id,
            count: 0
          };
          var includeObject = {
            include: [Question]
          };
          AnswerChoice.create(data, includeObject).then(function(answer_choice) {
            console.dir('ANSWER_CHOICE = ' + answer_choice);
          });
        });
      });
    });
  });
  return questionText + answerChoices;
}

function getRandomQuestion() {
  var question, answerChoices;
  return Question.find({
    order: [
        Sequelize.fn('RAND')
    ]
  }).then(function(questionResult) {
    if (questionResult) {
      question = questionResult;
      return AnswerChoice.findAll({
        where: {
          questionId: questionResult.id
        }
      }).then(function(answerChoicesResult) {
        answerChoices = answerChoicesResult;
        return [question, answerChoices];
      });
    }
  });
}

module.exports = {
  saveQuestion: saveQuestion,
  getRandomQuestion: getRandomQuestion,
  AnswerChoice: AnswerChoice
};