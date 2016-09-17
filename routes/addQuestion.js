var express = require('express');
var router = express.Router();

/* GET add question form. */
router.get('/', function(req, res, next) {
  res.render('addQuestion', { title: 'Express' });
});

module.exports = router;