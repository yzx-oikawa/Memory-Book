
var express = require("express");
var router = express.Router();
Memory = require("../models/memory");

// ====================
// MEMORIES ROUTES
// ====================

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
router.post("/", function (req, res) {
    // Get data from form and add to memories array
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var newMemory = { title: title, image: image, description: desc }
    // Create a new memory and save to DB
    Memory.create(newMemory, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // Redirect back to memories page
            res.redirect("/memories");
        }
    });
});

// NEW - show form to create new memory
router.get("/new", function (req, res) {
    res.render("memories/new.ejs");
});

// SHOW - shows more info about one memory
router.get("/:id", function (req, res) {
    // Find the memory with provided ID
    // And find all comments for that memory
    Memory.findById(req.params.id).populate("comments").exec(function (err, foundMemory) {
        if (err) {
            console.log(err);
        } else {
            // Render show template with that memory
            res.render("memories/show", { memory: foundMemory });
        }
    });
})

module.exports = router;