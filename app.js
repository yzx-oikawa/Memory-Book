var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var memories = [
    { name: "Beihang University", image: "/images/Beihang University.jpg" },
    { name: "Saihanba National Forest Park", image: "/images/Saihanba National Forest Park.jpg" },
    { name: "Clearwater Beach, Orlando", image: "/images/Clearwater Beach.jpg" },
    { name: "Kennedy Space Center", image: "/images/Kennedy Space Center.jpg" },
    { name: "Kiyomizu Temple", image: "/images/Kiyomizu Temple.jpg" },
    { name: "Kyoto University", image: "/images/Kyoto University.jpg" },
    { name: "Universal Studios Japan", image: "/images/Universal Studios Japan.jpg" },
    { name: "Beijing Solana", image: "/images/Beijing Solana.jpg" }
];


app.get("/", function (req, res) {
    res.render("landing");
})

app.get("/memories", function (req, res) {
    res.render("memories", { memories: memories });
});

app.listen(3001, function () {
    console.log("Memory Book Server listening on port 3001");
});