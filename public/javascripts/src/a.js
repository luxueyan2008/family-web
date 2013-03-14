define(function(require, exports, module){
	var $ = require('$');
	exports.a = function(name){
        return function(){
	       console.log($('a').text()+('--你好!' + (name || 'nobody')));
        };
	};
});