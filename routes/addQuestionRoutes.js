var express = require("express");
var questionModel = require("../models/question.js");
var router = express.Router();
var ensureAuthenticated = require("./authRoutes").ensureAuthenticated;

/* GET add question form. */
router.get("/", ensureAuthenticated, function(req, res, next) {
  res.render('addQuestion', { title: "Add Survey Question" });
});

router.post("/", function(req, res, next) {
  questionModel.saveQuestion(req.body.question, req.body.answerChoice);

  res.render('addQuestion', { title: "Add Survey Question", confirmQuestionSaved: "Question saved" });
});

module.exports = router;