const mongoose = require("mongoose");

const tournamentTreeSchema = mongoose.Schema({
    list: [{
        type: mongoose.Schema.Types.ObjectId, // initialise at resorting(list of teams);
        ref: "Teams"
    }],
    root: {
        type: mongoose.Schema.Types.ObjectId,  // initialise at CreateTournament(this.list);
        ref: "Match",
    }
});

module.exports = TournamentTree = mongoose.model("TournamentTree", tournamentTreeSchema);