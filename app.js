
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , engine = require('ejs-locals')
  , markdown = require('markdown-js')
  , http = require('http')
  , flash = require('connect-flash')
  , MongoStore = require('connect-mongo')(express) //将会话session存储于mongo数据库的模块
  , settings = require('./settings')
  , path = require('path');
var fs = require('fs');
var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});
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
  app.use(express.logger({stream: accessLogfile}));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(flash());
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
      db: settings.db
    })
  }));
  app.locals({
    // config: config,
    // title: config.title,
    isDev: true,//全局变量
    _layoutFile: true
  });
  //app.dynamicHelpers 3.0下的替代用法
  app.use(function(req, res, next){
    // res.locals.title = config['title']
    res.locals.csrf = req.session ? req.session._csrf : '';
    res.locals.req = req;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user;
    res.locals.session = req.session;
    next();
  });
  // app.locals.isDev = true;//全局变量
  app.use(routes(app));// 这样用的目的是将路由分离出去
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(function (err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next();
  });
});
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function(){
    // console.log(express);
    console.log("Express server listening on port " + app.get('port'));
  });
}
module.exports = app;
