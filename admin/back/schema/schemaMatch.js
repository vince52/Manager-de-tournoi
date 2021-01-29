const mongoose = require("mongoose");


const matchSchema = mongoose.Schema({
    Score: {
        type: Number,
        require: false
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