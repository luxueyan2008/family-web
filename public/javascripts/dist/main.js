define("main", [ "$", "./base", "_", "backbone" ], function(require) {
    var $ = require("$");
    var Base = require("./base");
    window.addEventListener("deviceorientation", function(e) {
        $(".gravity li .inner").css({
            transform: "rotate(" + (e.gamma || 0) + "deg) rotate3d(1,0,0, " + -1 * e.beta + "deg)"
        });
    }, false);
    var Collection = Base.Collection.extend();
    var demoCollections = new Collection([ {
        name: "123",
        id: "321"
    } ]);
    console.log(demoCollections);
});