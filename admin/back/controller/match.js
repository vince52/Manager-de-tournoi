const express = require('express')
const passport = require('passport')
const User = require('../schema/schemaUser')
const Player = require('../schema/schemaPlayer')
const Teams = require('../schema/schemaTeam')
const Match = require('../schema/schemaMatch')
const Tournament = require('./Tournament')
const { Team } = require('../schema/Game')

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
    obj.when = Date.now
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
        obj.score = match.Score
        obj.left_team = match.left_team
        obj.right_team = match.right_team
        if (match.left)
            obj.left = await populateAll(match.left)
        if (match.right)
            obj.right = await populateAll(match.right)
    }
    return obj
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

module.exports = function(app) {
    app.get('/getMatch/:id', auth, async (req, res) => {
        console.log(req.params.id)
        if (!req.params.id)
            return res.status(400).json({ error: 'Check Arguments' })
        Match.findOne({_id: req.params.id}).then(async team => {
            team.populate('matchs').execPopulate();
            obj = await populateAll(team)
            return res.status(200).json({matchs: obj})
        })
    }),
    app.get('/getSingleMatch/:id', auth, async (req, res) => {
        console.log(req.params.id)
        if (!req.params.id)
            return res.status(400).json({ error: 'Check Arguments' })
        Match.findOne({_id: req.params.id}).then(async team => {
            console.log(team)
            return res.status(200).json({matchs: team})
        })
    }),
    app.post('/start/', auth, async (req, res) => {
        console.log(req.body.matchid)
        if (!req.body.matchid)
            return res.status(400).json({ error: 'Check Arguments' })
        Match.findOne({_id: req.body.matchid}).populate('right_team').populate('left_team').then(async match => {
            console.log("HERE" + match)
            await match.left_team.members.forEach(element => {
                console.log("left team")
                console.log(element)
                User.findOne({_id: element}).then(eleme => {
                    const play = Player({Name: eleme.name, Kill: 0, Death: 0, Assist: 0})
                    play.save().then(saved => {
                        match.players.push(saved)
                    })
                })
                
                
            });
            await match.right_team.members.forEach(element => {
                    console.log("right_team")
                    console.log(element)
                    User.findOne({_id: element}).then(eleme => {
                        const play = Player({Name: eleme.name, Kill: 0, Death: 0, Assist: 0})
                        play.save().then(saved => {
                            match.players.push(saved)
                        })
                    })
            });
            await match.save().then(async nm => {
                await nm.populate('players').execPopulate();
                sleep(200)
                console.log(nm)
                return res.status(200).json({matchs: nm})
            })
        })
    })
}