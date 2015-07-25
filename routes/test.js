var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var TestObject = Parse.Object.extend('TestObject');
    var query = new Parse.Query(TestObject);

    var testId = '2CbMEvOsfT';
    query.get(testId, {
        success: function(testObj) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                res.render('test', {user: currentUser.getUsername()});
            } else {
                res.render('test', {user: 'Nobody'});
            }
        },
        error: function(object, error) {
            res.render('test', { user: 'failed query' });
        }
    });
});

module.exports = router;
