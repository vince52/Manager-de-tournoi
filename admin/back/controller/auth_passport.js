const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const SteamStrategy = require("passport-steam").Strategy;
const User = require("../schema/schemaUser");
const variable = require("./variable");

passport.serializeUser(function(user, done) {
    done(null, user.id);

    User.findOne({ _id: id })
        .then(user => {
            done(null, user);
        })
        .catch(function(err) {
            done(err, null);
        });
});

passport.use('local-signin', new LocalStrategy((username, password, done) => {
    User.findOne({ email: username })
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
                const newUser = User({ email: username, password: password, firstname: req.body.firstname, lastname: req.body.lastname })
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
let savedid = "";

passport.use('steam', new SteamStrategy({
    returnURL: 'http://localhost:8080/user/auth/steam/return',
    realm: 'http://localhost:8080/',
    apiKey: '3CCF5D84AD9A4CA0C817B6DEE608348E'
  },
  async function(identifier, profile, done) {
        profile.identifier = identifier;
        //console.log(variable.main.savedid);
        console.log("indentifier: ", profile._json);
        console.log("profile: ", profile);
        let user = await User.findOne({steamId: profile._json.steamid})
        if (!user) {
            console.log("test0");
            //let user2 = await User.findOne({_id : savedid})
            //if (!user2)
            //     return done(null, false, {err: "Error"});
            // console.log("test");
            // user2.steamId = profile._json.steamid;
            // user2.name =  profile._json.personaname;
            // user2.avatar = profile._json.avatar;
            // console.log("test2");
            // user2.save()
            // .catch(err => {return done(null, false, { message: 'already exist.' });})
            // console.log("test3");
        }

        return done(null, user)
  }
));

module.exports = passport;