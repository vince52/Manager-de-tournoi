const express = require('express')
const passport = require('passport')
const User = require('../schema/schemaUser')
var variabl = require("./variable");

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
let savedid;

function update_info(req, res, next) {
    var id = req.params.id;
    if (!id)
        return res.status(401).json({ error: 'not connected' })
    variabl.setName(id);
    console.log("TEST UPDATE INFO: ", variabl.getName());
    next();
}

module.exports = function(app) {
    // Logout
    app.get('/logout', auth, (req, res) => {
        try {
            console.log("logging out")
            req.logout();
            console.log("logged out")
            return res.status(200).json("logged out")
        } catch (e) {
            console.log(e)
            return res.status(400).json({ errors: err })
        }
    })

    // Login
    app.post('/login', (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
            if (err) {
                console.log("err")
                return res.status(400).json({ errors: err })
            } else if (!user) {
                console.log("no user", err, info)
                return res.status(401).json({ errors: "wrong pass" })
            } else {
                req.logIn(user, function(err) {
                    console.log("err", user)
                })
                console.log("logged in", user)
                return res.status(200).json({ userID: user.id, firstname: user.firstname, lastname: user.lastname, user: user });
            }
        })(req, res, next)
    })

    // REGISTER
    app.post('/register', (req, res, next) => {
        passport.authenticate('local-sign_up', (err, user, info) => {
            if (err) {
                console.log("err")
                return res.status(400).json({ errors: err })
            } else if (!user) {
                console.log("no user")
                return res.status(401).json({ errors: info })
            } else {
                req.logIn(user, function(err) {
                    console.log("err", user)
                })
                console.log("signing up", user)
                return res.status(200).json({ success: user.id });
            }
        })(req, res, next)
    })

    // IsAuth
    app.get('/isauth', async function(req, res) {
        if (req.isAuthenticated()) {
            return res.status(200).json({ connected: true })
        } else {
            return res.status(200).json({ connected: false })
        }
    })

    // Update informations
    app.post('/update', auth, async function(req, res) {
        let user = await User.findById(req.user.id);
        user.firstname = req.body.firstname
        user.lastname = req.body.lastname
        user.username = req.body.username
        user.save().then(() => {
                return res.status(200).json({ ok: true })
            })
            .catch(err => {
                return res.status(500).json({ ok: true })
            })
    })

    // Password update
    app.post('/password/update', auth, async function(req, res) {
        let user = await User.findById(req.user.id);
        user.password = req.body.password;
        user.save().then(() => {
                return res.status(200).json({ ok: true })
            })
            .catch(err => {
                return res.status(500).json({ ok: true })
            })
    })

    

    // Affiliate with steam
    app.get("/steam/auth/:id", update_info, passport.authenticate("steam", { session: false }));
    
    
    app.get(
        "/steam/return", passport.authenticate("steam", { session: false }), function(req, res, next) {
            const token = "test";
            res.render("authenticated", {
            token: token,
            clientUrl: "https://localhost:3000",
        });
    })
}