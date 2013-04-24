/**
 * @module 基础模块
 * @return {[object]}  [返回基础模块的mvc]
 */
define(function(require,exports,module){
    var _ = require('_');
    var B = require('backbone');
    /**
     * @class 基础模块类
     * @type {[function]}
     */
    var BaseModel = B.Model.extend({
        defaults: {
            name: '',
            id: ''
        }
    });
    /**
     * @class 基础集合类
     * @type {[function]}
     */
    var BaseCollection = B.Collection.extend({
        model: BaseModel,
        initialize: function(){
            console.log('collection create');
        }
    });
    /**
     * @class 基础视图类
     * @type {[function]}
     */
    var BaseView = B.View.extend({
       initialize: function(options) {
            this.options = $.extend(this.options, options);
            this.collection = options.collection;
            this.collection.bind('fetchCompleted:Collection', this.render, this);
            _.bindAll(this, 'render'); // bind this 上下文环境
            this.collection.bind('change', this.render);
            console.log('view create');
        }
    });
    module.exports = {
        Model: BaseModel,
        Collection: BaseCollection,
        View: BaseView
    };
});