const express = require("express");
const router = express.Router();
const Question = require("../models/question.js").Question;
const AnswerChoice = require("../models/answerChoice.js").AnswerChoice;

router.get("/", function(req, res, next) {
  getSurveyResults(res);
});

function getSurveyResults(res) {
  var questionWithAnswers, surveyResults = [];
  return Question.findAll().then(function(questionsResult) {
    console.log("questionsResult = " + questionsResult);
    questionsResult.forEach(function(question, i) {
      questionWithAnswers = {};
      return AnswerChoice.findAll({ where: { questionId: question.id }}).then(function(answerChoicesResult) {
        console.log("answerChoiceResult = " + answerChoicesResult);
        questionWithAnswers.question = question;
        questionWithAnswers.answerChoices = answerChoicesResult;
        surveyResults.push(questionWithAnswers);
        if (i === questionsResult.length - 1) {
          res.render("surveyResults", { title: "Survey Results", surveyResults: surveyResults });
        }
      });
    });
  });
}

module.exports = router;