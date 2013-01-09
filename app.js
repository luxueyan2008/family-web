
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , engine = require('ejs-locals')
  , user = require('./routes/user')
  , md = require('./routes/markdown')
  , markdown = require('markdown-js')
  , http = require('http')
  , path = require('path');

var app = express();
app.engine('ejs', engine);
//添加 md 文件的渲染引擎
app.engine('md', function(path, options, fn){
  var fs = require('fs');
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    str = markdown.parse(str).toString();
    fn(null, str);
  });
});
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.locals({
    _layoutFile: true
  });
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/markdown', md.demo);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
