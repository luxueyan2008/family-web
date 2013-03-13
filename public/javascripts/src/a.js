define(function(require, exports, module){
	var $ = require('$');
	exports.a = function(name){
	  alert($('a').text()+('--你好!' + (name || 'nobody')));
	};
});