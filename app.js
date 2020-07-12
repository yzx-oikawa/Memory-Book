var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Memory = require("./models/memory"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/memory_book", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seedDB();

// Passport Configuration
app.use(require("express-session")({
    secret: "Call me by your name",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass parameters to every template
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

// ====================
// MEMORIES ROUTES
// ====================

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

// NEW - show form to create new comment
app.get("/memories/:id/comments/new", isLoggedIn, function (req, res) {
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
app.post("/memories/:id/comments", isLoggedIn, function (req, res) {
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


// ====================
// AUTH ROUTES
// ====================

// Show sign up form
app.get("/register", function (req, res) {
    res.render("register");
});

// Handle sign up logic
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
    res.render("login");
});

// Handle login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/memories",
        failureRedirect: "/login"
    }), function (req, res) {
});

// Handle log out logic
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/memories");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


app.listen(3001, function () {
    console.log("Memory Book Server listening on port 3001");
});