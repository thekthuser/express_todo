var express = require('express');
var router = express.Router();


router.get('/post', function(req, res, next) {
    res.render('postItem');
});

router.post('/post', function(req, res, next) {
    var currentUser = Parse.User.current();
    if (currentUser) {
        var Item = Parse.Object.extend('Item');
        var newItem = new Item();
        var note = req.body.note;
        var checked = req.body.checked;

        //check this not empty
        newItem.set('note', note);
        newItem.set('checked', checked);
        newItem.setACL(new Parse.ACL(currentUser));
        newItem.save(null, {
            success: function(newItem) {
                res.send('Note successfully added.');
            },
            error: function(newItem, error) {
                res.send('There was an error.');
            }
        });
    } else {
        res.send('There was an error.');
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

        error: function(onject, error){
            res.send('There was an error.');
        }
    });
});

router.get('/get', function(req, res, next) {
    res.render('getItem');
});


router.get('/all', function(req, res, next) {
    var Item = Parse.Object.extend('Item');
    var query = new Parse.Query(Item);
    query.include(Parse.User.current().id);
    query.find({
        success: function(items) {
            res.send(items.toJSON());
        },
        error: function(error) {
            res.send('There was an error.');
        }
    });
});

module.exports = router;
