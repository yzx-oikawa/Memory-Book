var express = require("express");
var router = express.Router();

var Memory = require("../models/memory");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ================== /memories ====================

// INDEX - show all memories
router.get("/", function (req, res) {
    // Get all memories from DB
    Memory.find({}, function (err, allMemories) {
        if (err) {
            console.log(err);
        } else {
            res.render("memories/index", { memories: allMemories });
        }
    })
});

// CREATE - add new memory to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    // Get data from form and add to memories array
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMemory = new Memory({ title: title, image: image, description: desc, author: author });
    // Create a new memory and save to DB
    newMemory.save(function (err, memory) {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            // Redirect back to memories page
            req.flash("success", "Memory saved successfully");
            res.redirect("/memories");
        }
    });
});

// NEW - show form to create new memory
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("memories/new.ejs");
});

// SHOW - shows more info about one memory
router.get("/:id", function (req, res) {
    // Find the memory with provided ID
    // And find all comments for that memory
    Memory.findById(req.params.id).populate("comments").exec(function (err, foundMemory) {
        if (err || !foundMemory) {
            req.flash("error", "Memory not found");
            res.redirect("/memories");
        } else {
            // Render show template with that memory
            res.render("memories/show", { memory: foundMemory });
        }
    });
})

// EDIT
router.get("/:id/edit", middleware.checkMemoryOwnership, function (req, res) {
    Memory.findById(req.params.id, function (err, foundMemory) {
        res.render("memories/edit", { memory: foundMemory });
    })
})

// UPDATE
router.put("/:id", middleware.checkMemoryOwnership, function (req, res) {
    Memory.findByIdAndUpdate(req.params.id, req.body.memory, function (err, updatedMemory) {
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            req.flash("success", "Memory info updated");
            res.redirect("/memories/" + req.params.id);
        }
    })
})

// DESTROY
router.delete("/:id", middleware.checkMemoryOwnership, async function (req, res) {
    // Remove all comments when deleting a memory
    try {
        let foundMemory = await Memory.findByIdAndRemove(req.params.id);
        await foundMemory.remove();
        await Comment.remove({"_id": {"$in": foundMemory.comments}});
        req.flash("success", "Memory deleted");
        res.redirect("/memories");
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("back");
    }
})

module.exports = router;