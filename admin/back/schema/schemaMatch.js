const mongoose = require("mongoose");


const matchSchema = mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentTree",
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