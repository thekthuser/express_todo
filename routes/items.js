var express = require('express');
var router = express.Router();


router.get('/post', function(req, res, next) {
    res.render('postItem');
});

router.post('/post', function(req, res, next) {
    var note = req.body.note;
    if (note == '') {
        res.send('Notes cannot be empty.');
    }
    if (req.body.checked) {
        var checked = true;
    } else {
        var checked = false;
    }
    var currentUser = Parse.User.current();
    if (currentUser) {
        var Item = Parse.Object.extend('Item');
        var query = new Parse.Query(Item);
        query.equalTo('note', note);
        query.first({
            success: function(item) {
                //executes on found
                //executes on not found
                if ((!item) || ((item) && (item.toJSON().checked == false))) {
                    if (!item) {
                        var item = new Item();
                    }
                    item.set('note', note);
                    item.set('checked', checked);
                    item.setACL(new Parse.ACL(currentUser));
                    item.save(null, {
                        success: function(item) {
                            res.send('Note successfully added.');
                        },
                        error: function(item, error) {
                            res.send('There was an error.');
                        }
                    });
                } else {
                    res.send('This note has been checked.');
                }
            },
            error: function(error) {
                res.send('query.first error');
            }
        });
    } else {
        res.send('You must be logged in.');
    }
});

router.post('/get', function(req, res, next) {
    var Item = Parse.Object.extend('Item');
    var query = new Parse.Query(Item);
    var id = req.body.id;

    query.get(id, {
        success: function(item) {
            res.send(item.toJSON());
        },
        error: function(object, error){
            res.send('There was an error.');
        }
    });
});

router.get('/get', function(req, res, next) {
    res.render('getItem');
});


router.get('/all', function(req, res, next) {
    var currentUser = Parse.User.current();
    if (currentUser) {
        var Item = Parse.Object.extend('Item');
        var query = new Parse.Query(Item);
        query.include(currentUser.id);
        query.find({
            success: function(items) {
                res.send(items);
            },
            error: function(error) {
                res.send('There was an error.');
            }
        });
    } else {
        res.send('You must be logged in.');
    }
});

module.exports = router;
