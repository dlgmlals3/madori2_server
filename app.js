// main
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var app = express();

var defaultPort = 3333;
var port = process.argv[2];

app.set('port',  port || defaultPort);
app.use(bodyParser.urlencoded ({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
next();
});

var router = require('./routes/routers')(app);

//var errorHandler = expressErrorHandler({
//  static: {
//    '404': './public/404.html'
//  }
//});
//app.use(expressErrorHandler.httpError(404));
//app.use(errorHandler);

//var MongoClient = require('mongodb').MongoClient;
//var dbclient = require('./database/db_api.js');
//var database = dbclient.connectDB(MongoClient);
// db test api
//dbclient.findPassword(database, "dlgmlals3");

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('express port : ' + app.get('port'));
});
