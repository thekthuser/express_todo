var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var TestObject = Parse.Object.extend('TestObject');
    var query = new Parse.Query(TestObject);

    var testId = '2CbMEvOsfT';
    query.get(testId, {
        success: function(testObj) {
            res.render('test', {title: testObj.get('foo')});
        },
        error: function(object, error) {
            res.render('test', { title: 'failed query' });
        }
    });
});

module.exports = router;
