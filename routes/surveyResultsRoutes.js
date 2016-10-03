var express = require("express");
var questionModel = require("../models/question.js");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("surveyResults", { title: "Survey Results" });
});

module.exports = router;