var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Memory = require("./models/memory"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/memory_book", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seedDB();

app.get("/", function (req, res) {
    res.render("landing");
})

// INDEX - show all memories
app.get("/memories", function (req, res) {
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
app.post("/memories", function (req, res) {
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
app.get("/memories/new", function (req, res) {
    res.render("memories/new.ejs");
});

// SHOW - shows more info about one memory
app.get("/memories/:id", function (req, res) {
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


// ====================
// COMMENTS ROUTES
// ====================

app.get("/memories/:id/comments/new", function (req, res) {
    // Find memory by id
    Memory.findById(req.params.id, function (err, memory) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { memory: memory });
        }
    })
});

app.post("/memories/:id/comments", function (req, res) {
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
                    memory.comments.push(comment);
                    memory.save();
                    res.redirect('/memories/' + memory._id);
                }
            });
        }
    });
});


app.listen(3001, function () {
    console.log("Memory Book Server listening on port 3001");
});