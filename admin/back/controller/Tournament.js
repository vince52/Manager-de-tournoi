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
    if (req.isAuthenticated()) {
        next()
    } else {
        console.log("User is not authentified")
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
        if (match.left_team)
            obj.left_team = await match.populate('left_team').execPopulate()
        if (match.right_team)
            obj.right_team = await match.populate('right_team').execPopulate()
        obj.id = match._id
        if (match.left_score)
            obj.left_score = match.left_score
        if (match.right_score)
            obj.right_score = match.right_score
        obj.left_team = match.left_team
        obj.right_team = match.right_team
        if (match.left)
            obj.left = await populateAll(match.left)
        if (match.right)
            obj.right = await populateAll(match.right)
    }
    console.log("obj func:", obj)
    return obj
}

module.exports = function(app) {
    
    // FOR ADMIN:
    // create a tournament
    app.post('/create', auth, async function(req, res) {
        console.log("/create")
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
                return res.status(200).json({ tournament: a})
            }).catch(e => {
                console.log(e)
                return res.status(400).json({ error: e})
            })
            return res.status(200)
    })

    app.post('/update', auth, (req, res) => {
        try {
            console.log("Good1")
            if (!req.body.tournamentid)
                return res.status(400).json({err: "error"})
            console.log("Good2")
            Tournament.findOne({_id : req.body.tournamentid}).then(tourn => {
                    console.log("Good3")
                    if (req.body.name)
                        tourn.name = req.body.name
                    console.log("Good4")
                    if (req.user._id)
                        tourn.owner = req.user._id
                    console.log("Good5")
                    if (req.body.gameType)
                        tourn.gameType = req.body.gameType
                    if (req.body.gameMode)
                        tourn.gameMode = req.body.gameMode

                    let nbTeamLimit;
                    if (req.body.nbTeamLimit)
                        tourn.nbTeamLimit = req.body.nbTeamLimit
                    console.log("Good10")
                    tourn.save().then(tourna => {return res.status(200).json({tournament: tourna})}).catch(err => {return res.status(400).json({ error: err})})
            })
        } catch(e) {
            console.log(e)
            return res.status(400).json({ error: e})
        }
        
    })

    // need tournamentid tourmanementid
    app.post('/delete', auth, (req, res) => {
        console.log("/delete")
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
        console.log("/join")
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
        console.log("/leave")
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
        console.log("/start");
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
                //console.log(obj)  
            }
            return res.status(200).json({tournament: obj})
        })
    })

    app.post('/getTournament', auth, async (req, res) => {
        console.log("/getTournament")
        if (!req.body.tournamentid)
            return res.status(400).json({err: "error"})
        await Tournament.findOne({_id: req.body.tournamentid}).populate('registeredTeams').populate('matchs').then(tourn => {
            return res.status(200).json({tournament: tourn})
        }
        ).catch(err => {
            return res.status(500).json({error: err})
        })
    })

    app.post('/winner', auth, async (req, res) => {
        console.log("/winner")
        var obj = {}
        Tournament.findOne({_id : req.body.tournamentid}).then(async function (tourn) {
            console.log("AVANT", tourn.matchs)
            await tourn.populate('matchs').execPopulate();
            obj = await populateAll(tourn.matchs)
            console.log("OBJ: ", obj)
            if(req.body.teamid)
                tourn.matchs = await t.TeamWon(obj, req.body.teamid)
            tourn.populate('matchs').execPopulate();
            console.log("APRES", obj)
            return res.status(200).json({tournament: tourn})
        })
    })

    app.get('/getAll', auth, (req, res) => {
        console.log("/getAll")
        var tournamentmap = []
        Tournament.find().populate('registeredTeams').exec(function(err, tournaments) {
            tournaments.forEach(function(tournament) {
                tournamentmap.push(tournament);
            })
            return res.status(200).json({tournaments: tournamentmap})
        })
    })

    app.get('/getUserTournaments', auth, (req, res) => {
        console.log("/getUserTournaments")
        var tournamentmap = []
        Tournament.find({owners: req.user._id}).populate('registeredTeams').exec(function(err, tournaments) {
            tournaments.forEach(function(tournament) {
                tournamentmap.push(tournament);
            })
            return res.status(200).json({tournaments: tournamentmap})
        })
    })
    app.post('/updateTeam', auth, (req, res) => {})
}