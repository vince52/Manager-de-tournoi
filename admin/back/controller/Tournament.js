const express = require('express')
const passport = require('passport')
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

            let owner = await User.findById(req.user.id)
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
            await new Tournament({ name: name, owners: owners, gameType: gameType, gameMode: gameMode, nbTeamLimit: nbTeamLimit}).save().then( a => {
                // Useless now
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
        Tournament.findOne({_id : tourmanemntid}).then(tourn => {
            if (tourn.owners[0]._id === req.user.id) {
                let name = req.body.name

                tourn.owner = await User.findById(req.user.id)
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
            let owner = await User.findById(req.user.id);
            Tournament.findOneAndDelete({_id : req.body.tourmanemntid})
        } catch(e) {
            console.log(e);
            return res.status(400).json({ error: e });
        }
    })


    // FOR USERS:
    // Register to a tournament
    app.post('/join', auth, (req, res) => {
        if (req.id) {

        }
    })
    // Leave the tournament
    app.post('/leave', auth, (req, res) => {})
    app.get('/getAll', auth, (req, res) => {})
    app.post('/updateTeam', auth, (req, res) => {})
}