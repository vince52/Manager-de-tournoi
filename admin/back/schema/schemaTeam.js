const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    password: {
        type: String,
        require: false,
    },
    maxmember: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Teams = mongoose.model("Teams", teamSchema);