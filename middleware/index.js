var Memory = require("../models/memory");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in first!");
        res.redirect("/login");
    }
}

middlewareObj.checkMemoryOwnership = function (req, res, next) {
    // Check if the user is logged in
    if (req.isAuthenticated()) {
        Memory.findById(req.params.id, function (err, foundMemory) {
            if (err || !foundMemory) {
                req.flash("error", "Memory not found");
                res.redirect("/memories");
            } else {
                // Check if the user owns the memory
                // foundMemory.author.id is an object while req.user._id is a string
                if (foundMemory.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "Permission denied!");
                    res.redirect("/memories");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in first!");
        res.redirect("/memories");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    // Check if the user is logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("/memories/" + req.params.id);
            } else {
                // Check if the user owns the comment
                // foundComment.author.id is an object while req.user._id is a string
                if (foundComment.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "Permission denied");
					res.redirect("/memories/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in first!");
		res.redirect("/memories/" + req.params.id);
    }
}


module.exports = middlewareObj;