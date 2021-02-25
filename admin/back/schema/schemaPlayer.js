const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Kill: {
        type: Number,
        default: 0
    },
    Death: {
        type: Number,
        default: 0
    },
    Assist: {
        type: Number,
        default: 0
    },
});

module.exports = Player = mongoose.model("Player", playerSchema);