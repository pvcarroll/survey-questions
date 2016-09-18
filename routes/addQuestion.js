var express = require('express');
var router = express.Router();

/* GET add question form. */
router.get('/', function(req, res, next) {
  res.render('addQuestion', { title: 'Add Survey Question' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.send('POST /addQuestion');
});

module.exports = router;