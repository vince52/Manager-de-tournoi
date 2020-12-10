const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const SteamStrategy = require("passport-steam").Strategy;
const User = require("../schema/schemaUser");

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id })
        .then(user => {
            done(null, user);
        })
        .catch(function(err) {
            done(err, null);
        });
});

passport.use('local-signin', new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then(user => {
            console.log("found", user)
            if (!user) {
                return done(null, false, { message: 'No user.' });
            } else if (user.password != password) {
                console.log("wrong pass")
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                return done(null, user);
            }
        })
        .catch(err => {
            console.log("error", err)
            if (err) { return done(err); }
        })
}))

passport.use('local-sign_up', new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
    console.log(username, password)
    User.findOne({ username: username })
        .then(user => {
            console.log("found", user)
            if (!user) {
                console.log("sign up")
                const newUser = User({ username, password, firstname: req.body.firstname, lastname: req.body.lastname })
                console.log("signed up")
                newUser.save().then(user => { return done(null, user) }).catch(e => {
                    return done(e, null)
                })
            } else if (user.password != password) {
                console.log("wrong pass")
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                return done(null, false, { message: 'already exist.' });
            }
        })
        .catch(err => {
            console.log("error", err)
            if (err) { return done(err); }
        })
}))

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:8080/user/auth/steam/return',
    realm: 'http://localhost:8080/',
    apiKey: '3CCF5D84AD9A4CA0C817B6DEE608348E'
  },
  function(identifier, profile, done) {
    console.log("indentifier: ", identifier);
    console.log("profile: ", profile);
    console.log("done: ", done);
  }
));

module.exports = passport;