const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    Playerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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