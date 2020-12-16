const mongoose = require("mongoose");
const { schema } = require("./schemaUser");

const tournamentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    gameType: {
        type: String,
        require: true
    },
    gameMode: {
        type: String,
        require: false
    },
    nbTeamRegistered: {
        type: Int,
        default: 0
    },
    registerdTeams: [],
    matchs: [],
    nbTeamLimit: {
        type: Int,
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