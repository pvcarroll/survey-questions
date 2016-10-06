var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(userResult) {
      done(null, userResult);
    });
  });

  passport.use("login", new LocalStrategy(
      function(username, password, done) {
        User.find({ where: { username: username }}).then(function(userResult) {
          if (!userResult) {
            return done(null, false, { message: "No user has that username!" });
          }
          User.checkPassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (isMatch) {
              return done(null, userResult);
            } else {
              return done(null, false, { message: "Invalid password." });
            }
          });
        });
      }));
};