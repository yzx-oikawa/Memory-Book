var mongoose = require("mongoose");
var Memory = require("./models/memory");

var data = [
    {
        title: "Beihang University",
        image: "/images/Beihang University.jpg"
    },
    {
        title: "Saihanba National Forest Park",
        image: "/images/Saihanba National Forest Park.jpg"
    },
    {
        title: "Clearwater Beach, Orlando",
        image: "/images/Clearwater Beach.jpg"
    },
    {
        title: "Kennedy Space Center",
        image: "/images/Kennedy Space Center.jpg"

    },
    {
        title: "Kiyomizu Temple",
        image: "/images/Kiyomizu Temple.jpg"
    },
    {
        title: "Kyoto University",
        image: "/images/Kyoto University.jpg"
    },
    {
        title: "Universal Studios Japan",
        image: "/images/Universal Studios Japan.jpg"
    },
    {
        title: "Beijing Solana",
        image: "/images/Beijing Solana.jpg"
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
}

module.exports = seedDB;