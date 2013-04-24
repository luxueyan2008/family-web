define("b", [ "./a", "$" ], function(require, exports) {
    var a = require("./a").a;
    exports.b = a("demo 用户");
});

define("a", [ "$" ], function(require, exports, module) {
    var $ = require("$");
    exports.a = function(name) {
        return function() {
            console.log($("a").text() + ("--你好!" + (name || "nobody")));
        };
    };
});
