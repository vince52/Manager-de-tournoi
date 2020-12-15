const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    steamId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },

});

module.exports = User = mongoose.model("User", userSchema);