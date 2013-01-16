
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , engine = require('ejs-locals')
  , markdown = require('markdown-js')
  , http = require('http')
  , MongoStore = require('connect-mongo')(express) //将会话session存储于mongo数据库的模块
  , settings = require('./settings')
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
  app.use(express.cookieParser());
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
      db: settings.db
    })
  }));
  app.locals.isDev = true;//全局变量
  app.use(routes(app));// 这样用的目的是将路由分离出去
  app.locals({
    _layoutFile: true
  });
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


http.createServer(app).listen(app.get('port'), function(){
  // console.log(express);
  console.log("Express server listening on port " + app.get('port'));
});
