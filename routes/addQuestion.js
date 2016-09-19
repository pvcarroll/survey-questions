var express = require('express');
var questionModel = require('../models/question.js');
var router = express.Router();

/* GET add question form. */
router.get('/', function(req, res, next) {
  res.render('addQuestion', { title: 'Add Survey Question' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);


  const foo = questionModel.saveQuestion(req.body.question, req.body.answerChoice);

  res.send(foo);
});

module.exports = router;