var mongoose = require("mongoose");
var Memory = require("./models/memory");
var Comment = require("./models/comment");
var User = require("./models/user");

var data = [
    {
        title: "Beihang University",
        image: "/images/Beihang-University-1.jpg",
        description: ""
    },
    {
        title: "Saihanba National Forest Park",
        image: "/images/Saihanba-National-Forest-Park-1.jpg",
        description: ""
    },
    {
        title: "Clearwater Beach, Orlando",
        image: "/images/Clearwater-Beach-1.jpg",
        description: ""
    },
    {
        title: "Kennedy Space Center",
        image: "/images/Kennedy-Space-Center-1.jpg",
        description: ""

    },
    {
        title: "Kiyomizu Temple",
        image: "/images/Kiyomizu-Temple-1.jpg",
        description: ""
    },
    {
        title: "Kyoto University",
        image: "/images/Kyoto-University-1.jpg",
        description: ""
    },
    {
        title: "Universal Studios Japan",
        image: "/images/Universal-Studios-Japan-1.jpg",
        description: ""
    },
    {
        title: "Beijing Solana",
        image: "/images/Beijing-Solana-1.jpg",
        description: ""
    },
    {
        title: "Red Brick Art Museum",
        image: "/images/Red-Brick-Art-Museum-1.jpg",
        description: ""
    }
]

function seedDB() {
    //Remove all data
    Memory.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed all memories!");
    });

    User.findOne({ "username": "Christine" }, function (err, foundUser) {
        data.forEach(function (seed) {
            console.log(foundUser);
            var author = {
                id: foundUser._id,
                username: foundUser.username
            }
            seed.author = author;
            console.log(seed);
            Memory.create(seed, function (err, memory) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added a memory " + memory.title);
                }
            });
        });
    });

    Comment.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed all comments!");
    });
}

module.exports = seedDB;