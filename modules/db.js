var settings = require('./../settings') //自定义配置文件
	, Db = require('mongodb').Db
	, Connection = require('mongodb').Connection
	, Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));