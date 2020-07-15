var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route
router.get("/", function (req, res) {
    res.render("landing");
})

// Authentication

// Show sign up form
router.get("/register", function (req, res) {
    res.render("register");
});

// Handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    // This would hash the password automatically instead of storing the string directly in the DB
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to Memory Book, " + user.username + "!");
            res.redirect("/memories");
        });
    });
});

// Show login form
router.get("/login", function (req, res) {
    res.render("login");
});

// Handle login logic
// passport.authenticate: middleware
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/memories",
        failureRedirect: "/login"
    }), function (req, res) {
});

// Handle log out logic
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You are logged out!");
    res.redirect("/memories");
});

module.exports = router;