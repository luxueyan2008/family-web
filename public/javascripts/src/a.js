define(function(require, exports, module){
	var $ = require('$');
	exports.a = function(name){
        return function(){
	       alert($('a').text()+('--你好!' + (name || 'nobody')));
        };
	};
});