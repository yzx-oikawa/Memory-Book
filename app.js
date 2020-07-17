var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    // Memory = require("./models/memory"),
    // Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// Requring routes
var indexRoutes = require("./routes/index"),
    memoryRoutes = require("./routes/memories"),
    commentRoutes = require("./routes/comments");

mongoose.connect("mongodb://localhost/memory_book", {
// mongoose.connect("mongodb+srv://zixinye:yezixin0612@mongocluster-e1iea.mongodb.net/memory_book?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/memories", memoryRoutes);
app.use("/memories/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3001, function () {
    console.log("Memory Book Server listening on port 3001");
});