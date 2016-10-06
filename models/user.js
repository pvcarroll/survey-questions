var mysql = require("mysql");
var Sequelize = require("sequelize");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var PASSWORD = require("../config/passport").password;

var sequelize;
if (process.env.CLEARDB_DATABASE_URL) {
  // Production
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  // Development
  const localMysqlConfig = require('../config/localMysqlConfig');
  sequelize = new Sequelize(localMysqlConfig.database, localMysqlConfig.user, localMysqlConfig.password);
}
var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var noop = function() {};

(function createAdminUser() {
  const password = require("../config/passport").password;
  const username = require("../config/passport").username;
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(password, salt, noop, function(err, hashedPassword) {
      if (err) { return; }
      // SAVE ADMIN
      User.build({ username: username, password: hashedPassword }).save().then(function(userResult) {
        return "User saved";
      }).catch(function(error){});
    });
  });
})();

User.checkPassword = function(guess, done) {
  bcrypt.compare(guess, PASSWORD, function(err, isMatch) {
    done(err, isMatch);
  });
};

sequelize.sync().then(function() {
});

module.exports = User;