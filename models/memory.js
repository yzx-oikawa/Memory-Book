var mongoose = require("mongoose");

// SCHEMA SETUP
var memorySchema = new mongoose.Schema({
    title: String,
    images: [
        {
            name: String,
            url: String,
        }
    ],
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Memory", memorySchema);