
/*
 * GET home page.
 */
var user = require('./user')
	, weibo = require('./weibo')
	, demo = require('./demo')
	, Post = require('../models/post.js')
  	, md = require('./markdown');
module.exports = function (app) {
	app.get('/', function(req, res){
		Post.get(null, function(err, posts) {
			if (err) {
				posts = [];
			}
			res.render('index', {
				title: '山炮哥之家-首页',
				posts: posts
			});
		});
	});
	app.get('/login', checkNotLogin, function(req, res) {
		res.render('login', {
			title: '用户登入'
		});
	});
	app.get('/logout', checkLogin, function(req, res) {
		req.session.user = null;
		req.flash('success', '登出成功');
		res.redirect('/');
	});
	app.get('/reg', function(req, res){
		res.render('reg', {
			title: '山炮哥之家-注册'
		});
	});
	app.post('/reg', user.reg);
	app.post('/login', checkNotLogin, user.login);
	app.post('/post', checkLogin,weibo.post);
	app.get('/u/:user', weibo.list);
	app.get('/users', user.list);
	app.get('/markdown', md.demo);
	app.get('/demo/gravity', demo.gravity);

	return app.router;
};
//中间件 检查是否未登录
function checkLogin(req, res, next) {
	if (!req.session.user) {
		req.flash('error', '未登入');
		return res.redirect('/login');
	}
	next();
}
//中间件 检查是否已登录
function checkNotLogin(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	next();
}