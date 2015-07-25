var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    var user = new Parse.User();
    user.set('username', req.body.username);
    user.set('password', req.body.password);
    user.set('email', req.body.email);

    user.signUp(null, {
        success: function(user) {
            res.redirect('/');
        },
        error: function(user, error) {
            res.send('There was an error during registration.');
        }
    });
});


router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    //enableUnsafeCurrentUser discovered at
    //https://groups.google.com/forum/#!topic/nodejs/F_0oI4_hETs
    Parse.User.enableUnsafeCurrentUser();
    Parse.User.logIn(username, password, {
        success: function(user) {
            res.send('Successfully logged in.');
        },
        error: function(user, error) {
            res.send('There was an error logging in.');
        }
    });
});


router.get('/logout', function(req, res, next) {
    //enableUnsafeCurrentUser discovered at
    //https://groups.google.com/forum/#!topic/nodejs/F_0oI4_hETs
    Parse.User.enableUnsafeCurrentUser();
    Parse.User.logOut();
    res.redirect('/');
});

module.exports = router;
