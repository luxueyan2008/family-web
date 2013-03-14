// seajs.use('b',function(b){
//     b.b();
// });
define(function(require){
	var $ = require('$');
	window.addEventListener('deviceorientation', function(e){
		$('.gravity li .inner').css({transform:'rotate('+ (e.gamma || 0) + 'deg) rotate3d(1,0,0, ' + (e.beta*-1) + 'deg)'});
	}, false);
});