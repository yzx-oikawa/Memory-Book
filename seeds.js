var mongoose = require("mongoose");
var Memory = require("./models/memory");
var Comment = require("./models/comment");
var User = require("./models/user");

var data = [
    {
        title: "Graduation at Beihang University",
        images: [
            {
                name: "Graduation photo",
                url: "/images/Beihang-University-1.jpg",
            }, 
            {
                name: "Graduation photo",
                url: "/images/Beihang-University-2.jpg",
            },
            {
                name: "Graduation ceremony",
                url: "/images/Beihang-University-3.jpg",
            }
        ],
        description: "I spent four unforgettable years in Beihang University studying Computer Science. I have met many like-minded friends who can inspire each other. I have also broadened my horizons and found what I want to do for my future career. It was a very precious life experience."
    },
    {
        title: "Saihanba National Forest Park",
        images: [
            {
                name: "Sun rise",
                url: "/images/Saihanba-National-Forest-Park-1.jpg",
            }, 
            {
                name: "Seven Star Lake",
                url: "/images/Saihanba-National-Forest-Park-2.jpg",
            },
            {
                name: "Seven Star Lake",
                url: "/images/Saihanba-National-Forest-Park-3.jpg",
            }
        ],
        description: "I went to Saihanba National Forest Park with my parents twice before I went aboard for my graduate study. We had to drive around 7 hours to get there, but the bealtiful scenery made the journey worthwhile. It felt like heaven when we stood by the mirror-like lake and watched the sun rise slowly in the morning mist, far away from the hustle and bustle of the city. I really enjoyed the time we spent together there."
    },
    {
        title: "Clearwater Beach, Orlando",
        images: [
            {
                name: "Seabird",
                url: "/images/Clearwater-Beach-1.jpg",
            }, 
            {
                name: "White sand",
                url: "/images/Clearwater-Beach-2.jpg",
            },
            {
                name: "Enjoy the beach!",
                url: "/images/Clearwater-Beach-3.jpg",
            }
        ],
        description: "My boyfriend and I spent our last winter holiday in Orlando, Florida. The place I loved the most was the Clearwater Beach on the west coast. I was amazed at the sunshine there in middle December and the beautiful, clean white sand. We enjoyed sunbathing like everyone else. I would definitely went there again if I had a chance!"
    },
    {
        title: "Space Travel",
        images: [
            {
                name: "Atlantis",
                url: "/images/Kennedy-Space-Center-1.jpg",
            }, 
            {
                name: "Launch console",
                url: "/images/Kennedy-Space-Center-2.jpg",
            },
            {
                name: "Rocket engine",
                url: "/images/Kennedy-Space-Center-3.jpg",
            }
        ],
        description: "During our time in Orlando, we also visited the famouse Kennedy Space Center. We did not happen to see a rocket launch, but the museum was rich enough in exhibits. We saw a real launch console and some real rocket engines in the showrooms. The most impressive part was when the history of the space shuttle Atlantis was played on the screen, and then the screen arised and the real Atlantis appeared in front of us..."
    },
    {
        title: "Kyoto",
        images: [
            {
                name: "Kyoto University",
                url: "/images/Kyoto-University-1.jpg",
            },
            {
                name: "Interesting architecture",
                url: "/images/Kyoto-University-2.jpg",
            },
            {
                name: "Flowers",
                url: "/images/Kyoto-University-3.jpg",
            }
        ],
        description: "I spent a wonderful week last year in Japan with my friend Hitomi. She would go to Kyoto University in the fall, so we went to her future university for a visit. I like the architecture style in Kyoto, which is very retro. It is a quiet and clean city with a lot of flowers in front of every door."
    },
    {
        title: "Kiyomizu Temple and Fushimi Inari Shrine",
        images: [
            {
                name: "Kiyomizu Temple",
                url: "/images/Kiyomizu-Temple-1.jpg",
            }, 
            {
                name: "Hand Washing Pavilion",
                url: "/images/Kiyomizu-Temple-2.jpg",
            },
            {
                name: "Divination stick",
                url: "/images/Kiyomizu-Temple-3.jpg",
            }
        ],
        description: "We dressed in kimonos and visited Kiyomizu Temple and Fushimi Inari Shrine, two of the most famous temples in Kyoto. There are a lot of temples in Japan, where people go and pray for good fortune. They usually clean their hands and mouth in a special order before they enter the temples, which symbolizes purification of hearts. I drew a fortune stick at Fushimi Inari Shrine, which read very good luck!"
    },
    {
        title: "Universal Studios Japan",
        images: [
            {
                name: "Harry Potter theme store",
                url: "/images/Universal-Studios-Japan-1.jpg",
            }, 
            {
                name: "Butter beer!",
                url: "/images/Universal-Studios-Japan-3.jpg",
            },
            {
                name: "Hollywood Dream",
                url: "/images/Universal-Studios-Japan-2.jpg",
            }
        ],
        description: "Here comes my favourite part of my journey in Japan! We went to the Universal Studios Japan, a dream for movie and amusement park lovers. The Wizarding World of Harry Potter was so close to imagination that I almost cried with excitement. We entered the Hogwarts castle, bought magic souvenirs in Hogsmeade Village and tried butter beer, which was tastier than I thought. We went for rides on the best roller coasters in USJ - The Flying Dinosaur and Hollywood Dream, but we did not risk to take the backdrop!"
    },
    {
        title: "Beijing Solana",
        images: [
            {
                name: "Beijing Solana",
                url: "/images/Beijing-Solana-1.jpg",
            }
        ],
        description: "Solana is a mall with for shopping, food and leisure in my hometown Beijing. My family often spent weekends there together since I was a kid. I will always remember the clear blue sky and bright-colored flowers."
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
            var author = {
                id: foundUser._id,
                username: foundUser.username
            }
            seed.author = author;
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