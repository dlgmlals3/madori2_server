var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

// socket.io use
var socketio = require('socket.io');
var cors = require('cors');

var app = express();
var port = process.argv[2];
var dbPort = process.argv[3];
var dbName = "testDB";

/* setting global variable */
console.log("usage....> $ node app.js [ServerPort] [DbPort]\n\n");
switch (port) {
  case "3000":
	  dbName = "simon"
		break;
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

/* swagger */
const swaggerUi = require('swagger-ui-express');
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
// http://218.38.52.30:3000/api-docs
var swaggerDefinition = {
   info: {
       title: 'Madori2 swagger',
       version: '1.0.0', 
       description: 'API',
   },
   host: '218.38.52.30:3000',
   basePath: '/',
}
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/parameters.yaml']
}
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/* db connect */
console.log("db connect");
var mongooseApi = require('./database/mongooseApi');
var dbName = app.get('dbName');
var dbPort = app.get('dbPort');
mongooseApi.connectDB(dbName, dbPort);

app.use(bodyParser.urlencoded ({ extended: false }));
app.use(bodyParser.json());

// cors initial
app.use(cors());

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

// socket.io server start
var io = socketio.listen(server);
console.log('socket.io request to ready');

var login_ids = {}; // login id 와 socket id를 맵핑시킴...

io.sockets.on('connection', function(socket) { // when client try connection
	//console.log('connection info -> ' +
	//		JSON.stringify(socket.request.connection._peername));
	socket.remoteAddress = socket.request.connection._peername.address;
	socket.remotePort = socket.request.connection._peername.port;
	console.log('address ' + socket.remoteAddress + ' port : ' + socket.remotePort);
	// if connection closed, restore connection....
	
	socket.on('login', function(input) {
		console.log('login recieved' + JSON.stringify(input));
		login_ids[input.id] = socket.id; //로그인 id와 소켓객체 맵핑
		socket.login_id = input.id;
		// 로그인 정상적으로 되었는지 알려줌
		sendResponse(socket, 'login', 200, 'OK');
	});
	
	socket.on('message', function(message) {
		console.log('message recieved ->' + JSON.stringify(message));
		// send to client
		if (message.recepient == 'ALL') {
			console.log('send message to all client');
			io.sockets.emit('message', message);// send to all people == echo
			// socket.broadcast.emit(event, object) 나를 제외한 모든 클라이언트에게 전송
		} else {
			// 상대방을 찾아서 전송을 해야함
			// socket id를 알아야함
			if (login_ids[message.recipient]) {
				io.sockets.connected[login_ids[message.recipient]].emit('message', message);
				//login_ids[message.recipient].emit('message', '1234123413412341234');
				// 로그인을 하고있는 소켓들 중에 ( io.socket.connected )
				// socketid.emit()
				console.log('login recieved');
				sendResponse(socket, 'message', 200, 'OK');
			} else {
				sendResponse(socket, 'message', 400, 'no id');
			}
		}
	});
});

function sendResponse(socket, command, code, message) {
	var output = {
		command:command,
		code:code,
		message:message
	}
	socket.emit('response', output);
}

//https://www.youtube.com/watch?v=0pnMYLzZ48A&index=81&list=PLG7te9eYUi7tHH-hJ2yzBJ9h6dwBu1FUy