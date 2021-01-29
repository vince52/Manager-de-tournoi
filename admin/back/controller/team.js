const express = require('express')
const passport = require('passport')
const User = require('../schema/schemaUser')
const Teams = require('../schema/schemaTeam')
const Tournament = require('./Tournament')

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
    app.get('/getAll', auth, (req, res) => {
        Teams.find().populate('members').exec(function(err, teams) {
            if (err)
                res.status(500).json({error: err})
            res.status(200).json({team: teams})
        })
    })

    app.post('/create', auth, (req, res) => {
        if (!req.body.name || !req.body.password)
            return res.status(400).json({ error: 'Check Arguments' })
        
        const newTeam = Teams({name: req.body.name, password: req.body.password, maxmember: 5})
        newTeam.members.push(req.user._id)
        newTeam.save().then(team => {return res.status(200).json({team: team})}).catch(err => {res.status(500).json({error: err}); console.log(err)})
    })

    app.post('/join', auth, (req, res) => {
        if (!req.body.teamid)
            return res.status(400).json({ error: 'Check Arguments' })
        Teams.findOne({_id: req.body.teamid}).then(team => {
            team.members.push(req.user._id) 
            team.save().then(tm => {
                res.status(200).json({team: tm})
            }).catch(err => {res.status(500).json({error: err})})
        }).catch(err => {res.status(500).json({error: err})})
    })

    app.post('/leave', auth, (req, res) => {
        if (!req.body.teamid)
            return res.status(400).json({ error: 'Check Arguments' })
        Teams.findOne({_id: req.body.teamid}).then(team => {
            team.members.remove({_id: req.user._id})
            team.save().then(tm => {
                res.status(200).json({team: tm})
            }).catch(err => {res.status(500).json({error: err})})
        }).catch(err => {res.status(500).json({error: err})})
    })

    app.post('/delete', auth, (req, res) => {
        if (!req.body.teamid)
            return res.status(400).json({ error: 'Check Arguments' })
        Teams.findOneAndDelete({_id: req.body.teamid}).then(team => {
            res.status(200).json({team: {}})
        }).catch(err => {res.status(500).json({error: err})})
    })
}