var Memory = require("../models/memory");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkMemoryOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Memory.findById(req.params.id, function (err, foundMemory) {
            if (err) {
                res.redirect("/memories");
            } else {
                // does user own the memory?
                if (foundMemory.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("/memories");
                }
            }
        });
    } else {
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


module.exports = middlewareObj;