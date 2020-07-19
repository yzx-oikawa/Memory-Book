var mongoose = require("mongoose");
var Memory = require("./models/memory");
var Comment = require("./models/comment");
var User = require("./models/user");

var data = [
    {
        title: "Beihang University",
        images: [
            {
                name: "Beihang University",
                url: "/images/Beihang-University-1.jpg",
            }, 
            {
                name: "Beihang University",
                url: "/images/Beihang-University-2.jpg",
            },
            {
                name: "Beihang University",
                url: "/images/Beihang-University-3.jpg",
            }
        ],
        description: ""
    },
    {
        title: "Saihanba National Forest Park",
        images: [
            {
                name: "Saihanba National Forest Park",
                url: "/images/Saihanba-National-Forest-Park-1.jpg",
            }, 
            {
                name: "Saihanba National Forest Park",
                url: "/images/Saihanba-National-Forest-Park-2.jpg",
            },
            {
                name: "Saihanba National Forest Park",
                url: "/images/Saihanba-National-Forest-Park-3.jpg",
            }
        ],
        description: ""
    },
    {
        title: "Clearwater Beach, Orlando",
        images: [
            {
                name: "Clearwater Beach, Orlando",
                url: "/images/Clearwater-Beach-1.jpg",
            }, 
            {
                name: "Clearwater Beach, Orlando",
                url: "/images/Clearwater-Beach-2.jpg",
            },
            {
                name: "Clearwater Beach, Orlando",
                url: "/images/Clearwater-Beach-3.jpg",
            }
        ],
        description: ""
    },
    {
        title: "Kennedy Space Center",
        images: [
            {
                name: "Kennedy Space Center",
                url: "/images/Kennedy-Space-Center-1.jpg",
            }, 
            {
                name: "Kennedy Space Center",
                url: "/images/Kennedy-Space-Center-2.jpg",
            },
            {
                name: "Kennedy Space Center",
                url: "/images/Kennedy-Space-Center-3.jpg",
            }
        ],
        description: ""

    },
    {
        title: "Kiyomizu Temple",
        images: [
            {
                name: "Kiyomizu Temple",
                url: "/images/Kiyomizu-Temple-1.jpg",
            }, 
            {
                name: "Kiyomizu Temple",
                url: "/images/Kiyomizu-Temple-2.jpg",
            },
            {
                name: "Kiyomizu Temple",
                url: "/images/Kiyomizu-Temple-3.jpg",
            }
        ],
        description: ""
    },
    {
        title: "Kyoto University",
        images: [
            {
                name: "Kyoto University",
                url: "/images/Kyoto-University-1.jpg",
            }, 
            {
                name: "Kyoto University",
                url: "/images/Kyoto-University-1.jpg",
            },
            {
                name: "Kyoto University",
                url: "/images/Kyoto-University-1.jpg",
            }
        ],
        description: ""
    },
    {
        title: "Universal Studios Japan",
        images: [
            {
                name: "Universal Studios Japan",
                url: "/images/Universal-Studios-Japan-1.jpg",
            }, 
            {
                name: "Universal Studios Japan",
                url: "/images/Universal-Studios-Japan-2.jpg",
            },
            {
                name: "Universal Studios Japan",
                url: "/images/Universal-Studios-Japan-3.jpg",
            }
        ],
        description: ""
    },
    {
        title: "Beijing Solana",
        images: [
            {
                name: "Beijing Solana",
                url: "/images/Beijing-Solana-1.jpg",
            },
            {
                name: "Beijing Solana",
                url: "/images/Beijing-Solana-1.jpg",
            },
            {
                name: "Beijing Solana",
                url: "/images/Beijing-Solana-1.jpg",
            }
        ],
        description: ""
    }
    // {
    //     title: "Red Brick Art Museum",
    //     image: "/images/Red-Brick-Art-Museum-1.jpg",
    //     description: ""
    // }
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