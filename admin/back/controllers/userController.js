module.exports = function (app) {
    app.get('/', (req, res, next) => {
        res.send("I'm a test");
      });
}

module.exports = function (app) {
  app.post('/login', (req, res, next) => {
    passport.authenticate('login', function(err, user, info) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      if (!user) {
          return res.status(400).json({ errors: "No user found" });
      }
      req.logIn(user, function(err) {
          if (err) {
              return res.status(400).json({ errors: err });
          }
          return res.status(200).json({ success: `logged in ${user.id}`, uuid: user.uuid });
      });
    })(req, res, next)
  })

  app.post('/register', (req, res, next) => {
    passport.authenticate('register', function(err, user, info) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      if (!user) {
          return res.status(400).json({ errors: "No user found" });
      }
      req.logIn(user, function(err) {
          if (err) {
              return res.status(400).json({ errors: err });
          }
          return res.status(200).json({ success: `Welcome ${user.id}, please login`, uuid: user.uuid });
      });
    })(req, res, next)
  })
/*
  app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

  app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
      res.redirect('/');
  });
*/
}