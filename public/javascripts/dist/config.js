seajs.config({
    plugins: ["shim"],
    base: "/javascripts/dist/",
    alias: {
        // b: "b",
        "$": {
            src: "/javascripts/libs/jquery-1.9.1.min.js",
            exports: "jQuery"
        },
        "jquery-ui": {
            src: "javascripts/libs/jquery-ui-1.8.23.custom.min.js",
            deps: ["$"]
        },
        _: {
            src: "/javascripts/libs/underscore.min.js",
            exports: "_"
        },
        backbone: {
            src: "/javascripts/libs/backbone.min.js",
            deps: ["$","_"],
            exports: "Backbone"
        },

    }
});