var express = require("express");
var questionModel = require("../models/question.js");
var answerModel = require("../models/answerChoice.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  renderIndex(req, res);
});

/* Save a survey response */
router.post("/addAnswer", function(req, res, next) {
  var answerChoice = JSON.parse(req.body.answerChoice);
  answerModel.saveAnswer(answerChoice.answer, answerChoice.questionId);

  renderIndex(req, res);
});

function renderIndex(req, res) {
  var currentUser = (req.user) ? req.user.username : "";
  var question, answerChoices = [];
  var questionPromise = questionModel.getRandomQuestion();
  questionPromise.then(function(questionAndAnswersResult) {
    if (questionAndAnswersResult) {
      question = questionAndAnswersResult[0].text;
      answerChoices = questionAndAnswersResult[1];
    }
    res.render("index", { title: "Survey Question",
                          question: question,
                          answerChoices: answerChoices,
                          currentUser: currentUser });
  });
}

module.exports = router;