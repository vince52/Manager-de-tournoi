const express = require('express')
const passport = require('passport')
const f = require('../schema/Action')
const g = require('../schema/Game')
const t = require('../schema/Tree')
const User = require('../schema/schemaUser')
const Tournament = require('../schema/schemaTournament')

function auth(req, res, next) {
    console.log("try")
    console.log(req.user)
    console.log(req.session)
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.status(401).json({ error: 'not connected' })
    }
}

module.exports = function(app) {
    
    // FOR ADMIN:
    // create a tournament
    app.post('/create', auth, (req, res) => {
        try {
            let name = req.body.name

            let owner = User.findById(req.user.id)
            let owners = []
            owners.push(owner)

            let gameType = req.body.gameType
            let gameMode;
            if (req.body.gameMode)
                gameMode = req.body.gameMode
            else
                gameMode = "competitive"

            let nbTeamLimit;
            if (req.body.nbTeamLimit)
                nbTeamLimit = req.body.nbTeamLimit
            else
                nbTeamLimit = 16

            let tournament;
            new Tournament({ name: name, owners: owners, gameType: gameType, gameMode: gameMode, nbTeamLimit: nbTeamLimit}).save().then( a => {
                return res.status(400).json({ tournament: a})
            }).catch(e => {
                console.log(e)
                return res.status(400).json({ error: e})
            })
            return res.status(200)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ error: e})
        }
    })

    app.post('/update', auth, (req, res) => {
        if (!req.body.tournamentid)
            return req.status(400).json( {error: "bad request"})
        Tournament.findOne({_id : req.body.tournamentid}).then(tourn => {
            if (tourn.owners[0]._id === req.user.id) {
                let name = req.body.name

                tourn.owner = User.findById(req.user.id)
                let owners = []
                owners.push(owner)

                tourn.gameType = req.body.gameType
                let gameMode;
                if (req.body.gameMode)
                    gameMode = req.body.gameMode
                else
                    gameMode = "competitive"

                let nbTeamLimit;
                if (req.body.nbTeamLimit)
                    nbTeamLimit = req.body.nbTeamLimit
                else
                    nbTeamLimit = 16

                let tournament;
            }
        })
        
    })

    // need tourmanemntid
    app.post('/delete', auth, (req, res) => {
        try {
            let owner = User.findById(req.user.id);
            Tournament.findOneAndDelete({_id : req.body.tourmanemntid})
        } catch(e) {
            console.log(e);
            return res.status(400).json({ error: e });
        }
    })


    // FOR USERS:
    // Register to a tournament
    app.post('/join', auth, (req, res) => {
        if (!req.body.tournamentid)
            return res.status(400).json({error: "Bad request"})
        User.findOne({_id : req.user._id}).then(user => {
            Tournament.findOne({_id: tourmanemntid}).then(tournament => {
                //tournament.
            })
        })
    })
    // Leave the tournament
    app.post('/leave', auth, (req, res) => {})

    app.get('/start', auth, (req, res) => {
        Tournament.findOne({_id : tourmanemntid}).then(tourn => {
            if (tourn.nbTeamLimit == tourn.nbTeamRegistered)
                tourn.BinTree = new t.BinaryTree(tourn.registeredTeams)
        })
    })

    app.post('/declareWinner', auth, (req, res) => {
        Tournament.findOne({_id : tourmanemntid}).then(tourn => {
            if(req.body.TeamName)
                tourn.BinTree.root = t.TeamWon(tourn.BinTree.root, req.body.TeamName)
        })
    })

    app.get('/getAll', auth, (req, res) => {
        Tournament.find({}, function(err, tournaments) {
            var tournamentmap = {}
            tournaments.forEach(function(tournament) {
                tournamentmap[tournament._id] = tournament;
            })
            return res.status(200).json({tournaments: tournamentmap})
        })
    })
    app.post('/updateTeam', auth, (req, res) => {})
}