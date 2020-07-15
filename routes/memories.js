var express = require("express");
var router = express.Router();
var Memory = require("../models/memory");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function (req, res) {
    // Get data from form and add to memories array
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMemory = { title: title, image: image, description: desc, author: author }
    // Create a new memory and save to DB
    Memory.create(newMemory, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // Redirect back to memories page
            console.log(newlyCreated);
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
        if (err) {
            console.log(err);
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
            res.redirect("/memories");
        } else {
            res.redirect("/memories/" + req.params.id);
        }
    })
})

// DESTROY
router.delete("/:id", middleware.checkMemoryOwnership, function(req, res){
    Memory.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/memories");
        } else {
            res.redirect("/memories");
        }
    })
})

module.exports = router;