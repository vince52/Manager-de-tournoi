const express = require('express')
const passport = require('passport')
const User = require('../schema/schemaUser')

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
                return res.status(200).json({ userID: user.id, firstname: user.firstname, lastname: user.lastname });
            }
        })(req, res, next)
    })

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

    app.get('/getUserAssignement', auth, function(req, res) {
        res.json("Hello World")
    })

    app.get('/getUserAssignments', auth, async function(req, res) {
        let user = await User.findById(req.user.id);
        let assignments = await Assignment.find({}, '_id name time subject').where('_id').in(user.assignments).exec()
        return res.status(200).json({ assignments: assignments })
    })

    app.get('/getCourses', auth, async function(req, res) {
        let user = await User.findById(req.user.id)
        let courses = await Course.find().where('_id').in(user.courses).populate('teacher')
        return res.status(200).json({ courses: courses })
    })
    app.get('/getTeacherCourses', auth, async function(req, res) {
        let user = await User.findById(req.user.id)
        let courses = await Course.find().where('_id').in(user.owned_courses).populate('students')
        return res.status(200).json({ courses: courses })
    })
    app.get('/students', auth, async function(req, res) {
        let users = await User.find({}, '_id firstname lastname');
        return res.status(200).json({ students: users });
    })

    app.get('/isauth', async function(req, res) {
        if (req.isAuthenticated()) {
            return res.status(200).json({ connected: true })
        } else {
            return res.status(200).json({ connected: false })
        }
    })

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
    app.get("/auth/steam", passport.authenticate("steam", { session: false }));

    app.get(
        "/auth/steam/return",
        passport.authenticate("steam", { session: false }),
        (req, res) => {
            return res.status(200).json({ success: "OK" })
        },
      );
}