const express = require('express')
const passport = require('passport')
const User = require('../schema/schemaUser')
const Teams = require('../schema/schemaTeam')
const Tournament = require('./Tournament')

function auth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        console.log("User is not authentified")
        return res.status(401).json({ error: 'not connected' })
    }
}

module.exports = function(app) {
    app.get('/getAll', auth, (req, res) => {
        Teams.find().populate('members').exec(function(err, teams) {
            if (err)
                return res.status(500).json({error: err})
            return res.status(200).json({team: teams})
        })
    })

    app.get('/getTeam/:id', auth, (req, res) => {
        if (!req.params.id)
            return res.status(400).json({ error: 'Check Arguments' })
        Teams.find({_id: req.params.id} ).populate('members').exec(function(err, team) {
            if (err)
                return res.status(500).json({error: err})
            else
                return res.status(200).json({team: team})
        })
    })

    app.post('/create', auth, (req, res) => {
        if (!req.body.name || !req.body.password)
            return res.status(400).json({ error: 'Check Arguments' })
        
        const newTeam = Teams({name: req.body.name, password: req.body.password, maxmember: 5})
        newTeam.members.push(req.user._id)
        newTeam.owner = req.user._id
        newTeam.save().then(team => {return res.status(200).json({team: team})}).catch(err => {res.status(500).json({error: err}); console.log(err)})
    })

    app.post('/join', auth, (req, res) => {
        if (!req.body.teamid)
            return res.status(400).json({ error: 'Check Arguments' })
        Teams.findOne({_id: req.body.teamid}).then(team => {
            var test = team.members.find(elem => elem.toString() == req.user._id)
            if (test)
                return res.status(401).json({err: "Already Inside"})

            team.members.push(req.user._id)
            team.save().then(tm => {
                return res.status(200).json({team: tm})
            }).catch(err => {return res.status(500).json({error: err})})
        }).catch(err => {return res.status(500).json({error: err})})
    })

    app.post('/leave', auth, (req, res) => {
        if (!req.body.teamid)
            return res.status(400).json({ error: 'Check Arguments' })
        Teams.findOne({_id: req.body.teamid}).then(team => {
            team.members.remove({_id: req.user._id})
            team.save().then(tm => {
                return res.status(200).json({team: tm})
            }).catch(err => {return res.status(500).json({error: err})})
        }).catch(err => {return res.status(500).json({error: err})})
    })

    app.post('/delete', auth, (req, res) => {
        if (!req.body.teamid)
            return res.status(400).json({ error: 'Check Arguments' })
        Teams.findOneAndDelete({_id: req.body.teamid}).then(team => {
            return res.status(200).json({team: {}})
        }).catch(err => {return res.status(500).json({error: err})})
    })

    app.get('/myTeams', auth, (req, res) => {
        Teams.find({members: req.params.id} ).populate('members').exec(function(err, teams) {
            if (err)
                return res.status(500).json({error: err})
            else
                return res.status(200).json({team: teams})
        })
    })
}