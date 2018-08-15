var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var app = express();
var port = process.argv[2];
var dbPort = process.argv[3];
var dbName = "testDB";

/* setting global variable */
console.log("usage....> $ node app.js [ServerPort] [DbPort]\n\n");
switch (port) {
  case "3300":
	  dbName = "simon"
		break;
	case "3301":
	  dbName = "minwoohi"
		break;
	case "3302":
	  dbName = "heculous"
		break;
	case "3303":
	  dbName = "mesi"
		break;
	default:
	  console.log("ServerPort(3300(simon) or 3301(minwoohi) or 3302(heculous) or 3303(mesi)");
	  process.exit(-1);
}
	
app.set('port',  port);
app.set('dbName',  dbName);
app.set('dbPort',  dbPort || 27017);

/* db connect */
console.log("db connect");
var mongooseApi = require('./database/mongooseApi');
var dbName = app.get('dbName');
var dbPort = app.get('dbPort');
mongooseApi.connectDB(dbName, dbPort);

app.use(bodyParser.urlencoded ({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
next();
});

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('express port : ' + app.get('port') + ', dbName : ' + app.get('dbName')
					+ ', dbPort : ' + app.get('dbPort'));
});

var router = require('./routes/routers')(app);
