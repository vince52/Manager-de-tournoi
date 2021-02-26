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
        Match.findOne({_id: req.params.id}).populate('matchs').then(async team => {
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
    app.post('/start/', auth, (req, res) => {
        console.log(req.body.matchid)
        if (!req.body.matchid)
            return res.status(400).json({ error: 'Check Arguments' })

        Match.findOne({_id: req.body.matchid}).populate('left_team').populate('right_team')
            .then(match => {
                if (!match) {
                    console.log("No match Found")
                }
                const left_team = match.left_team.members;
                left_team.forEach(element => {
                    const player = Player(element)
                    player.save().then(a => {match.players.push(a)}).catch(e => {console.log("error", e)})
                })

                const right_team = match.right_team.members;
                right_team.forEach(element => {
                    const player = Player(element)
                    player.save().then(a => {match.players.push(a)}).catch(e => {console.log("error", e)})
                })
                match.save().then(matchb => {
                    console.log(matchb)
                    return res.status(200).json({matchs: matchb})
                })
            })
    }),
    app.post('/updatematch/', auth, (req, res) => {
        console.log(req.body.matchid)
        if (!req.body.matchid)
            return res.status(400).json({ error: 'Check Arguments' })
        if (!req.body.right_score)
            return res.status(400).json({ error: 'Check Arguments' })
        if (!req.body.left_score)
            return res.status(400).json({ error: 'Check Arguments' })

        Match.findOne({_id : req.body.matchid}).then(match => {
            match.right_score = req.body.right_score
            match.left_score = req.body.left_score
            match.save().then(ret => {
                return res.status(200).json({match: ret})
            }).catch(err => { return res.status(400).json({error: err})})
        })
        //return res.status(400).json({error: "RANDOM eror"})
    })
}