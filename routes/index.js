var express = require('express');
var questionModel = require('../models/question.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var questionsAndAnswers, question, answerChoices;
  var questionPromise = questionModel.getRandomQuestion();
  var questionsAndAnswers = questionPromise.then(function(questionAndAnswersResult) {
    console.log("questionAndAnswersResults = " + JSON.stringify(questionAndAnswersResult));
    question = questionsAndAnswers[0];
    answerChoices = questionsAndAnswers[1];
    res.render('index', { title: 'Survey Question', question: question, answerChoices: answerChoices });
  });
});

module.exports = router;