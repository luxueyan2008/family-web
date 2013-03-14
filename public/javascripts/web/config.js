seajs.config({
    // Enable plugins
    plugins: ['shim'],
    base: '/javascripts/sea-modules/',
    // Configure alias
    alias: {
        'b': 'demospm/demo/1.0.0/b',
        '$': {
            src: '/javascripts/libs/jquery-1.9.1.min.js',
            exports: 'jQuery'
        }
    }
});
