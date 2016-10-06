var express = require('express');
var expressLess = require('express-less');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/indexRoutes');
var addQuestion = require('./routes/addQuestionRoutes');
var surveyResults = require('./routes/surveyResultsRoutes');
var authentication = require('./routes/authRoutes').router;
var users = require('./routes/users');

var setUpPassport = require("./setuppassport");

var app = express();
setUpPassport();

app.use('/stylesheets', expressLess(__dirname + '/less'));
// Enable error reporting permanently 
app.use('/stylesheets', expressLess(__dirname + '/less', { debug: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : require('./config/passport').secret,
  resave: true,
  saveUnitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/addQuestion', addQuestion);
app.use('/surveyResults', surveyResults);
app.use('/', authentication);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;