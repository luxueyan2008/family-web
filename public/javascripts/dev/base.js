/**
 * @module 基础模块
 * @return {[object]}  [返回基础模块的mvc]
 */
define("base", [ "_", "backbone" ], function(require, exports, module) {
    var _ = require("_");
    var B = require("backbone");
    /**
     * 基础模块类
     * @class BaseModel
     * @constructor
     * @type {[function]}
     */
    var BaseModel = B.Model.extend({
        defaults: {
            /**
             * @property {string} name
             * @default ''
             */
            name: "",
            /**
             * @property {string} id
             * @default ''
             */
            id: ""
        }
    });
    /**
     * 基础集合类
     * @class BaseCollection
     * @constructor
     * @type {[function]}
     */
    var BaseCollection = B.Collection.extend({
        model: BaseModel,
        /**
         * 实例化时的默认执行方法
         * @method initialize
         * @return {[object]} new BaseCollection
         */
        initialize: function() {
            console.log("collection create");
        }
    });
    /**
     * 基础视图类
     * @class BaseView
     * @constructor
     * @type {[function]}
     */
    var BaseView = B.View.extend({
        /**
         * 实例化时的默认执行方法
         * @method initialize
         * @return {[object]} new BaseView
         */
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