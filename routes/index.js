var express = require('express');
var questionModel = require('../models/question.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var question, answerChoices;
  var questionPromise = questionModel.getRandomQuestion();
  questionPromise.then(function(questionAndAnswersResult) {
    question = questionAndAnswersResult[0];
    answerChoices = questionAndAnswersResult[1];
    res.render('index', { title: 'Survey Question', question: question.text, answerChoices: answerChoices });
  });
});

module.exports = router;