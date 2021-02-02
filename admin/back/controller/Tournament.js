const express = require('express')
const passport = require('passport')
//const f = require('../schema/Action')
//const g = require('../schema/Game')
const t = require('../schema/Tree')
const Tree = require('../schema/schemaTournamentTree')
const Match = require('../schema/schemaMatch')
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

async function populateAll(match) {
    var obj = {}
    if (match) {
        if (match.right)
            obj.right = await match.populate('right').execPopulate()
        if (match.left)
            obj.left = await match.populate('left').execPopulate()
        obj.id = match._id
        obj.score = match.Score
        obj.team_left = match.left_team
        obj.team_right = match.right_team
        if (match.left)
            obj.left = await populateAll(match.left)
        if (match.right)
            obj.right = await populateAll(match.right)
    }
    return obj
}

module.exports = function(app) {
    
    // FOR ADMIN:
    // create a tournament
    app.post('/create', auth, async function(req, res) {
            let name = req.body.name

            let owner = User.findById(req.user._id)
            console.log("PRINT USER: ", req.user._id)
            let owners = req.user._id

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

            const newtournament = Tournament({ name: name, owners: owners, gameType: gameType, gameMode: gameMode, nbTeamLimit: nbTeamLimit, matchs: null})
            newtournament.save().then( a => {
                return res.status(400).json({ tournament: a})
            }).catch(e => {
                console.log(e)
                return res.status(400).json({ error: e})
            })
            return res.status(200)
    })

    app.post('/update', auth, (req, res) => {
        try {
            if (!req.body.tournamentid)
                return res.status(400).json({err: "error"})
            Tournament.findOne({_id : req.body.tournamentid}).then(tourn => {
                if (tourn.owners[0]._id === req.user._id) {
                    if (req.body.name)
                        tourn.name = req.body.name
                    if (req.user._id)
                        tourn.owner = req.user._id
                    if (req.body.gameType)
                        tourn.gameType = req.body.gameType
                    if (req.body.gameMode)
                        tourn.gameMode = req.body.gameMode

                    let nbTeamLimit;
                    if (req.body.nbTeamLimit)
                        tourn.nbTeamRegistered = req.body.nbTeamLimit

                    tourn.save().then(tourna => {return res.status(200).json({tournament: tourna})}).catch(err => {return res.status(400).json({ error: err})})
                }
            })
        } catch(e) {
            console.log(e)
            return res.status(400).json({ error: e})
        }
        
    })

    // need tournamentid tourmanementid
    app.post('/delete', auth, (req, res) => {
        try {
            if (!req.body.tournamentid)
                return res.status(400).json({err: "error"})
            let owner = User.findById(req.user.id);
            Tournament.findOneAndDelete( {_id : req.body.tournamentid}, err => {if (err) return res.status(500).json({ ok: err });})
            return res.status(200).json({ ok: "ok" });
        } catch(e) {
            console.log(e);
            return res.status(400).json({ error: e });
        }
    })


    // FOR USERS:
    // Register to a tournament
    app.post('/join', auth, (req, res) => {
        try {
            if (!req.body.tournamentid)
                return res.status(400).json({err: "error"})
            if (!req.body.teamid)
                return res.status(400).json({error: "Bad request"})
            Tournament.findOne({_id: req.body.tournamentid}).then(tournament => {
                tournament.registeredTeams.push(req.body.teamid)
                tournament.save().then(tourn => {return res.status(200).json({tournament: tourn})})
            })
        } catch(e) {
            console.log(e);
            return res.status(400).json({ error: e });
        }
    })
    // Leave the tournament
    app.post('/leave', auth, (req, res) => {
        try {
            if (!req.body.tournamentid)
                return res.status(400).json({error: "Bad request"})
            if (!req.body.teamid)
                return res.status(400).json({error: "Bad request"})

            // TO DO
            
            Tournament.findOne({_id: req.body.tournamentid}).then(tourn => {
                const ind = tourn.registeredTeams.indexOf(req.body.teamid)
                tourn.registeredTeams.splice(ind, 1)
                tourn.save().then(tourn => {return res.status(200).json({tournament: tourn})})
            })
        } catch(e) {
            console.log(e);
            return res.status(400).json({ error: e });
        }
    })

    app.post('/start', auth, async (req, res) => {
        var obj = {}
        if (!req.body.tournamentid)
            return res.status(400).json({err: "error"})
        Tournament.findOne({_id : req.body.tournamentid}).then(async function (tourn) {
            if (tourn.nbTeamLimit == tourn.registeredTeams.length) {
                tmp = t.resorting(tourn.registeredTeams)
                tourn.matchs = await t.CreateTournament(tmp)
                tourn.populate('matchs').execPopulate();
                tourn.save()
                obj = await populateAll(tourn.matchs)
                console.log(obj)  
            }
            return res.status(200).json({tournament: obj})
        })
    })

    app.post('/getTournament', auth, async (req, res) => {
        if (!req.body.tournamentid)
            return res.status(400).json({err: "error"})
        await Tournament.findOne({_id: req.body.tournamentid}).populate('registeredTeams').populate('matchs').exec(async function(err, tourn) {
            console.log(tourn)
            obj = {}
            if (err)
                return res.status(500).json({error: "Internal Server Error"})
            obj = tourn
            console.log(obj)
            return res.status(200).json({tournament: obj})
        }
        )
    })

    app.post('/winner', auth, (req, res) => {
        Tournament.findOne({_id : req.body.tournamentid}).then(tourn => {
            if(req.body.teamid)
                tourn.BinTree.root = t.TeamWon(tourn.matchs, req.body.teamid)
        })
    })

    app.get('/getAll', auth, (req, res) => {
        var tournamentmap = []
        Tournament.find().populate('registeredTeams').exec(function(err, tournaments) {
            tournaments.forEach(function(tournament) {
                tournamentmap.push(tournament);
            })
            return res.status(200).json({tournaments: tournamentmap})
        })
    })
    app.post('/updateTeam', auth, (req, res) => {})
}