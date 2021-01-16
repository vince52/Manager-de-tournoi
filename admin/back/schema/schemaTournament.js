const mongoose = require("mongoose");
const { schema } = require("./schemaUser");
const f = require('./Action')
const g = require('./Game')
const t = require('./Tree')

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
    registeredTeams: [new g.Team("1"), new g.Team("2"),
                      new g.Team("3"), new g.Team("4"),
                      new g.Team("5"), new g.Team("6"),
                      new g.Team("7"), new g.Team("8"), // To empty later
                      new g.Team("9"), new g.Team("10"),
                      new g.Team("11"),new g.Team("12"),
                      new g.Team("13"),new g.Team("14"),
                      new g.Team("15"),new g.Team("16")],
    matchs: [],
    BinTree: {
        type: t.BinaryTree,
        require : false
    },
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