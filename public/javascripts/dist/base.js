define("base",["_","backbone"],function(e,i,o){var n=e("_"),t=e("backbone"),l=t.Model.extend({defaults:{name:"",id:""}}),c=t.Collection.extend({model:l,initialize:function(){console.log("collection create")}}),d=t.View.extend({initialize:function(e){this.options=$.extend(this.options,e),this.collection=e.collection,this.collection.bind("fetchCompleted:Collection",this.render,this),n.bindAll(this,"render"),this.collection.bind("change",this.render),console.log("view create")}});o.exports={Model:l,Collection:c,View:d}});