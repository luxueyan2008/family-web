define("c", [ "_", "backbone" ], function(require, exports, module) {
    var _ = require("_");
    var B = require("backbone");
    var BaseModel = B.Model.extend({
        defaults: {
            name: "",
            id: ""
        }
    });
    var BaseCollection = B.Collection.extend({
        model: BaseModel,
        initialize: function() {
            console.log("collection create");
        }
    });
    var BaseView = B.View.extend({
        initialize: function(options) {
            this.options = $.extend(this.options, options);
            this.collection = options.collection;
            this.collection.bind("fetchCompleted:Collection", this.render, this);
            _.bindAll(this, "render");
            // bind this 上下文环境
            this.collection.bind("change", this.render);
            console.log("view create");
        }
    });
    module.exports = {
        Model: BaseModel,
        Collection: BaseCollection,
        View: BaseView
    };
});
