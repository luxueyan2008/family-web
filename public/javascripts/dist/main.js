define(function(e) {
    var a = e("$");
    window.addEventListener("deviceorientation", function(e) {
        a(".gravity li .inner").css({
            transform: "rotate(" + (e.gamma || 0) + "deg) rotate3d(1,0,0, " + -1 * e.beta + "deg)"
        })
    }, !1)
});