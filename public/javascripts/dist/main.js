define('',['$','./c'],function(require) {
    var $ = require('$');
    // var b = require('./b');
    var Base = require('c');
    window.addEventListener("deviceorientation", function(e) {
        $(".gravity li .inner").css({
            transform: "rotate(" + (e.gamma || 0) + "deg) rotate3d(1,0,0, " + -1 * e.beta + "deg)"
        })
    }, !1)
    var Collection = Base.Collection.extend();
    var demoCollections = new Collection([{name: '123',id:'321'}]);
    console.log(demoCollections);
});