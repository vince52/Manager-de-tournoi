const mongoose = require("mongoose");
const f = require('./Action')
const g = require('./Game')
//const t = require('./Tree')

const tournamentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    owners: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    gameType: {
        type: String,
        require: true
    },
    gameMode: {
        type: String,
        require: false
    },
    nbTeamRegistered: {
        type: Number,
        default: 0
    },
    registeredTeams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams"
    }],
    matchs: {
        type: mongoose.Schema.Types.ObjectId,
        require : "TournamentTree"
    },
    nbTeamLimit: {
        type: Number,
        require: false
    },
    beginningDate: {
        type: Date,
        default: Date.now
    },
    endRegistrationDate: {
        type: Date,
        default: Date.now
    },
    cashprize: {
        type: String,
        require: false
    },
    Timezone: {
        type: String,
        default: "Europe/Paris (UTC+1)",
    },
    creationDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = Assignment = mongoose.model("Tournaments", tournamentSchema);