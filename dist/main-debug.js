define("[object Object]/family-web/0.1.0/main-debug", [ "./a-debug", "jquery-debug" ], function(require) {
    var a = require("./a-debug");
    a();
});

define("[object Object]/family-web/0.1.0/a-debug", [ "jquery-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    exports.a = function() {
        alert("test");
    };
});