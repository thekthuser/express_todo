var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var currentUser = Parse.User.current();
    if (currentUser) {
        res.render('index', {title: 'Express', user: currentUser.getUsername()});
    } else {
        res.render('index', {title: 'Express', user: 'Nobody'});
    }
  //res.render('index', { title: 'Express' });
});

module.exports = router;
