const express = require('express')
const passport = require('passport')
const User = require('../schema/schemaUser')
const Teams = require('../schema/schemaTeam')
const Match = require('../schema/schemaMatch')
const Tournament = require('./Tournament')

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
    })
}