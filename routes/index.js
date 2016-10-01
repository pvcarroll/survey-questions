var express = require('express');
var questionModel = require('../models/question.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var questionsAndAnswers, question, answerChoices;
  var questionPromise = questionModel.getRandomQuestion();
  questionsAndAnswers = questionPromise.then(function(questionAndAnswersResult) {
    console.log("questionAndAnswersResults = " + JSON.stringify(questionAndAnswersResult));
    question = questionAndAnswersResult[0];
    answerChoices = questionAndAnswersResult[1];
    res.render('index', { title: 'Survey Question', question: question.text, answerChoices: answerChoices });
  });
});

module.exports = router;