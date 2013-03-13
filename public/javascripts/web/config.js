seajs.config({
  // Enable plugins
  plugins: ['shim'],

  // Configure alias
  alias: {
    '$': {
      src: '/javascripts/libs/jquery-1.9.1.min.js',
      exports: 'jQuery'
    }
  }
});