$(document).ready(function() {
    var Item = Backbone.Model.extend({
        idAttribute: 'objectId',
        url: '/items/get/',
    });
    var ItemCollection = Backbone.Collection.extend({
        model: Item,
        url: '/items/all',
    });


    //the following is test code to fetch Collections, fetch and save Models

    //var list = new ItemCollection();
    //console.log(list.fetch());
    var item = new Item();
    //console.log(item.fetch());
    item = item.fetch(
        {
            data: {id: 'AEWyzREgdR'}, //just an id known to exist for test user
            type: 'POST',
        }
    );
    console.log(item);

    /*
    var saveItem = new Item({note: 'test save note', checked: false});
    saveItem.save(null, {
        type: 'POST',
        url: '/items/post',
    });
    */
});
