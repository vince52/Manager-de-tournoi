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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Teams = mongoose.model("Teams", teamSchema);