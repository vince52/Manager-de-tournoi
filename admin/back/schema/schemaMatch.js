const mongoose = require("mongoose");


const matchSchema = mongoose.Schema({
    Score: {
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
    }
});


module.exports = Match = mongoose.model("Match", matchSchema);