
var express = require("express");
var router = express.Router({ mergeParams: true });
var Memory = require("../models/memory");
var Comment = require("../models/comment");

// ====================
// COMMENTS ROUTES
// ====================

// NEW - show form to create new comment
router.get("/new", isLoggedIn, function (req, res) {
    // Find memory by id
    Memory.findById(req.params.id, function (err, memory) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { memory: memory });
        }
    })
});

// CREATE - add new comment to DB
router.post("/", isLoggedIn, function (req, res) {
    // Find memory by id
    Memory.findById(req.params.id, function (err, memory) {
        if (err) {
            console.log(err);
            res.redirect("/memories");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // Add comment to comment list
                    memory.comments.push(comment);
                    memory.save();
                    res.redirect('/memories/' + memory._id);
                }
            });
        }
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;