;(function(window,undefined){
    module( "group a",{
        setup: function(){
            this.example1 = 1;
        }
    });
    test( "a basic test example", function() {
        this.example1 += 1;
        equal(this.example1,1,'test this example1');
        ok( true, "this test is fine" );
    });
    test( "a basic test example 2", function() {
        
        equal(this.example1,1,'test this example1');
        ok( true, "this test is fine" );
    });
     
    module( "group b" );
    test( "a basic test example 3", function() {
        ok( true, "this test is fine" );
    });
    test( "a basic test example 4", function() {
        ok( true, "this test is fine" );
    });
})(window);