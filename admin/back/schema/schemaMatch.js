const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
    left_score: {
        type: Number,
        require: false
    },
    right_score: {
        type: Number,
        require: false
    },
    left_team : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
    },
    right_team : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
    },
    left: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
    },
    right: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
    },
    when: {
        type: String
    },
    players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
    }]
});


module.exports = Match = mongoose.model("Match", matchSchema);