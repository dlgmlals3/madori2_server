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
var port = 3333;

app.set('port', process.env.PORT || port);
app.use(bodyParser.urlencoded ({ extended: false }));
app.use(bodyParser.json());

var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var router = require('./routes/routers')(app);

var MongoClient = require('mongodb').MongoClient;
var dbclient = require('./database/db_api.js');
var database = dbclient.connectDB(MongoClient);
// db test api
dbclient.findPassword(database, "dlgmlals3");

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('express port : ' + app.get('port'));
});
