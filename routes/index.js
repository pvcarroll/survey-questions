var express = require("express");
var questionModel = require("../models/question.js");
var answerModel = require("../models/answer.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  renderIndex(res);
});

router.post('/addAnswer', function(req, res, next) {
  console.log('POST /addAnswer');
  console.log(req.body);

  answerModel.saveAnswer(req.body.answerChoice);

  renderIndex(res);
});

function renderIndex(res) {
  var question, answerChoices;
  var questionPromise = questionModel.getRandomQuestion();
  questionPromise.then(function(questionAndAnswersResult) {
    question = questionAndAnswersResult[0];
    answerChoices = questionAndAnswersResult[1];
    res.render('index', { title: 'Survey Question', question: question.text, answerChoices: answerChoices });
  });
}

module.exports = router;