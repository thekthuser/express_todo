(function($) {
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
        template: _.template("\
            <form action='/items' method='POST'>\
                <input type='note' name='note' value='<%= note %>' readonly>\
                <input type='checkbox' name='checked' <%= display_check %>>\
                <input type='submit' name='submit' value='Update'>\
            </form>\
        "),
        initialize: function() {
            this.render();
        },
        render: function() {
            var so = this;
            list.fetch({
                success: function(items) {
                    //console.log(items.models);
                    _.each(items.models, function(item) {
                        if (item.attributes.checked) {
                            var display_check = "checked";
                        } else {
                            var display_check = "";
                        }
                        so.$el.append(so.template({
                            note: item.attributes.note, 
                            display_check: display_check
                        }));
                    });
                },
            });
        },
    });

    $(document).ready(function() {
        var view = new View();
        //view.render();
    });
})(jQuery);
