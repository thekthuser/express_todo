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

var list = new ItemCollection();
    var View = Backbone.View.extend({
        el: '#container',
        render: function() {
            var badScopeEl = this.$el; //cannot access this.$el from inside functions
            list.fetch({
                success: function(items) {
                    console.log(items.models);
                    _.each(items.models, function(item) {
                        //badScopeEl.append(item.attributes.note);
                        //var a = _.template( $('#template').html(), {note: item.attributes.note});
                        //var a = "<h1>" + item.attributes.note + "</h1><br />";
                        /*
                        if (item.attributes.checked) {
                            var display_check = "checked";
                        } else {
                            var display_check = "";
                        }
                        var a = "Note: " + item.attributes.note + " Checked: " + 
                        item.attributes.checked + "<br />";
                        badScopeEl.append(a);
                        */
                        if (item.attributes.checked) {
                            var display_check = "checked";
                        } else {
                            var display_check = "";
                        }
                        var form = "\
            <form action='/items' method='POST'>\
                <input type='note' name='note' value='" + item.attributes.note + "' readonly>\
                <input type='checkbox' name='checked' " + display_check + ">\
                <input type='submit' name='submit' value='Update'>\
            </form>";
                        badScopeEl.append(form);
                    });
                },
            });
        },
    });

    var view = new View();
    view.render();

});
