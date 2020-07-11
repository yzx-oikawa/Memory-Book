var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Memory = require("./models/memory"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/memory_book", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

app.get("/", function (req, res) {
    res.render("landing");
})

//INDEX - show all memories
app.get("/memories", function (req, res) {
    // Get all memories from DB
    Memory.find({}, function (err, allMemories) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { memories: allMemories });
        }
    })
});

//CREATE - add new memory to DB
app.post("/memories", function (req, res) {
    // get data from form and add to memories array
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var newMemory = { title: title, image: image, description: desc }
    // Create a new memory and save to DB
    Memory.create(newMemory, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to memories page
            res.redirect("/memories");
        }
    });
});

//NEW - show form to create new memory
app.get("/memories/new", function (req, res) {
    res.render("new.ejs");
});

// SHOW - shows more info about one memory
app.get("/memories/:id", function (req, res) {
    //find the memory with provided ID
    Memory.findById(req.params.id, function (err, foundMemory) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", { memory: foundMemory });
        }
    });
})

app.listen(3001, function () {
    console.log("Memory Book Server listening on port 3001");
});