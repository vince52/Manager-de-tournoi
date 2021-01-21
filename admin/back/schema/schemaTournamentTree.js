const mongoose = require("mongoose");
/*
BinaryTree : class BinaryTree { 
    constructor(li) {
      this.list = module.exports.resorting(li);
      this.root = module.exports.CreateTournament(this.list); 
    }
},
Node : class Node { 
    constructor(data, left, right) {
        this.data = data; 
        this.left = left; 
        this.right = right; 
    } 
},*/

const tournamentTreeSchema = mongoose.Schema({
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams"
    }],
    root: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentNode",
    }
});

const nodeSchema = mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentTree",
    },
    left: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentNode",
    },
    right: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TournamentNode",
    }
});

module.exports = TournamentTree = mongoose.model("TournamentTree", tournamentTreeSchema);
module.exports = TournamentNode = mongoose.model("TournamentNode", nodeSchema);