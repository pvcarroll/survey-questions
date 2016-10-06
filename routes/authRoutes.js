var express = require("express");
var passport = require("passport");
var router = express.Router();
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/login", function(req, res) {
  res.render("login", { message: req.flash("loginMessage") });
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in as the admin to see this page.");
    res.redirect("/login");
  }
}

module.exports = {
  router: router,
  ensureAuthenticated: ensureAuthenticated
};