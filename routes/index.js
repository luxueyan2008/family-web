
/*
 * GET home page.
 */
var user = require('./user')
  , md = require('./markdown')
  , _ = require('underscore');
var commonViewData;
module.exports = function (app) {
	app.get('*',function(req,res,next){
		commonViewData = {req: req,res: res};
		next();
	});
	app.get('/', function(req, res){
		res.render('index', _.extend(commonViewData, {title: '山炮哥之家-注册'}));
	});
	app.get('/reg',function(req, res){
		res.render('reg',_.extend(commonViewData, {title: '山炮哥之家-注册'}));
	});
	app.get('/users', user.list);
	app.get('/markdown', md.demo);
	return app.router;
};