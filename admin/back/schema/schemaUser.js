const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
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
    steam: {
        type: Object,
        required: false,
    }

});

module.exports = User = mongoose.model("User", userSchema);