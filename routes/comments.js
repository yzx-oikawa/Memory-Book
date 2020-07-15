
var express = require("express");
var router = express.Router({ mergeParams: true });
var Memory = require("../models/memory");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ====================
// COMMENTS ROUTES
// ====================

// NEW - show form to create new comment
router.get("/new", middleware.isLoggedIn, function (req, res) {
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
router.post("/", middleware.isLoggedIn, function (req, res) {
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

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { memory_id: req.params.id, comment: foundComment });
        }
    })
})

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/memories/" + req.params.id);
        }
    })
})

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect(back);
        } else {
            res.redirect("/memories/" + req.params.id);
        }
    })
})


module.exports = router;