$(document).ready(function() {
    var Item = Backbone.Model.extend({
        idAttribute: 'objectId',
        urlRoot: '/items/get',
    });
    var ItemCollection = Backbone.Collection.extend({
        model: Item,
        url: '/items/all',
    });

    //var list = new ItemCollection();
    //console.log(list.fetch());
    //var item = new Item({id: 'AEWyzREgdR'});
    //console.log(item);
});
