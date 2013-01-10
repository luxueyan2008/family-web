
/*
 * GET home page.
 */
var user = require('./user')
  , md = require('./markdown');
module.exports = function (app) {
	app.get('/', function(req, res){
	  res.render('index', { title: 'Express' });
	});

	app.get('/users', user.list);
	app.get('/markdown', md.demo);
	return app.router;
}