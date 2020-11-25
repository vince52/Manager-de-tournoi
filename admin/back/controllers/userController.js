const account = require('./account/lib.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.get('/test', (req, res, next) => {
        res.send("I'm a test");
      });
    app.post('/signup',account.signup);
}