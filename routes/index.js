var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root route
router.get("/", function (req, res) {
    res.render("landing");
})

// ====================
// AUTH ROUTES
// ====================

// Show sign up form
router.get("/register", function (req, res) {
    res.render("register");
});

// Handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/memories");
        });
    });
});

// Show login form
router.get("/login", function (req, res) {
    res.render("login");
});

// Handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/memories",
        failureRedirect: "/login"
    }), function (req, res) {
});

// Handle log out logic
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/memories");
});

module.exports = router;