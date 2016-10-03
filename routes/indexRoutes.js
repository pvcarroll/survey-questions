var express = require("express");
var questionModel = require("../models/question.js");
var answerModel = require("../models/answer.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  renderIndex(res);
});

/* Save a survey response */
router.post("/addAnswer", function(req, res, next) {
  var answerChoice = JSON.parse(req.body.answerChoice);
  answerModel.saveAnswer(answerChoice.answer, answerChoice.questionId);

  renderIndex(res);
});

function renderIndex(res) {
  var question, answerChoices = [];
  var questionPromise = questionModel.getRandomQuestion();
  questionPromise.then(function(questionAndAnswersResult) {
    if (questionAndAnswersResult) {
      question = questionAndAnswersResult[0].text;
      answerChoices = questionAndAnswersResult[1];
    }
    res.render("index", { title: "Survey Question", question: question, answerChoices: answerChoices });
  });
}

module.exports = router;