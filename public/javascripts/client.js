$(document).ready(function() {
    var Item = Backbone.Model.extend({
        idAttribute: 'objectId',
        urlRoot: '/items',
    });
    var ItemCollection = Backbone.Collection.extend({
        model: Item,
        url: '/items/',
    });

    /*
    //var list = new ItemCollection();
    //console.log(list.fetch());

    //var item = new Item({objectId: 'AEWyzREgdR'});
    //console.log(item.fetch());
    
    //var item = new Item({note: 'test66', checked: false});
    //item.save();

    var item = new Item({objectId: 'ifFhfBswsf'});
    //item.set({checked: true});
    item.fetch({
        success: function(model) {
            //console.log(model.checked);
            item.set({checked: false});
            item.save();
        }
    });
    */

    var View = Backbone.View.extend({
        el: '#container',
        render: function() {
            var list = new ItemCollection();
            var badScopeEl = this.$el; //cannot access this.$el from inside functions
            list.fetch({
                success: function(items) {
                    console.log(items.models);
                    _.each(items.models, function(item) {
                        //badScopeEl.append(item.attributes.note);
                        var a = _.template( $('#template').html(), {note: item.attributes.note});
                        badScopeEl.append(a);
                    });
                },
            });
        },
    });

    var view = new View();
    view.render();

});
