// define(function(require,exports) {

//   var a = require('./a').a;

//   a('demo 用户');

// });
seajs.use('a',function(a){
    a.a('demo');
});