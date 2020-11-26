const bcrypt = require("bcryptjs");
const User = require("../schema/schemaUser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const SteamStrategy = require("passport-steam").Strategy;
const { v4: uuidv4 } = require('uuid');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Local Strategy
passport.use('register',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        // Match User
        User.findOne({ email: email })
            .then(user => {
                // Create new User
                if (!user) {
                    const newUser = new User({ email, password });
                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                    // Return other user
                } else {
                    return done(null, false, { message: "User Already Exist" });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

passport.use('login',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        // Match User
        User.findOne({ email: email })
            .then(user => {
                // Create new User
                if (!user) {
                    return done(null, false, { message: "User does not exist" });
                } else {
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

passport.use('steamLogin', 
    new SteamStrategy({
        returnURL: 'http://localhost:28000/auth/steam/return',
        realm: 'http://localhost:28000/',
        apiKey: '3CCF5D84AD9A4CA0C817B6DEE608348E'
    },
    function(identifier, profile, done) {
        User.findOne({ openId: identifier }, function (err, user) {
            return done(err, user);
        });
    }
));

module.exports = passport;