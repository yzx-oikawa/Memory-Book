var mongoose = require("mongoose");
var Memory = require("./models/memory");
var Comment = require("./models/comment");

var data = [
    {
        title: "Beihang University",
        image: "/images/Beihang-University-1.jpg"
    },
    {
        title: "Saihanba National Forest Park",
        image: "/images/Saihanba-National-Forest-Park-1.jpg"
    },
    {
        title: "Clearwater Beach, Orlando",
        image: "/images/Clearwater-Beach-1.jpg"
    },
    {
        title: "Kennedy Space Center",
        image: "/images/Kennedy-Space-Center-1.jpg"

    },
    {
        title: "Kiyomizu Temple",
        image: "/images/Kiyomizu-Temple-1.jpg"
    },
    {
        title: "Kyoto University",
        image: "/images/Kyoto-University-1.jpg"
    },
    {
        title: "Universal Studios Japan",
        image: "/images/Universal-Studios-Japan-1.jpg"
    },
    {
        title: "Beijing Solana",
        image: "/images/Beijing-Solana-1.jpg"
    }
]

function seedDB() {
    //Remove all data
    Memory.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed all memories!");

        data.forEach(function (seed) {
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