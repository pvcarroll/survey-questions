var express = require('express');
var questionModel = require('../models/question.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  questionModel.getRandomQuestion();
  res.render('index', { title: 'Express' });
});

module.exports = router;
