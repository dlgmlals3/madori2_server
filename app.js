var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

// socket.io use
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
	  dbName = "heocules"
		break;
	case "3303":
	  dbName = "mesi"
		break;
	default:
	  console.log("ServerPort(3300(simon) or 3301(minwoohi) or 3302(heocules) or 3303(mesi)");
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
   host: '218.38.52.30:3302',
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
var io = require('socket.io')(server, {
	pingTimeout: 1000
});

io.on('connection', function(socket){

	socket.emit('CONNECT', {
		type : 'connected'
	});	// socket.emit('CONNECT')
	
	socket.on('JOIN_ROOM', function(data){
		socket.join(data.roomId);
		console.log('CREATE_ROOM socket... data.roomId : ' + data.roomId);
		socket.broadcast.to(data.roomId).emit('SEND_MSG', {
			msg : data.nickName + ' joined this room'
		});

	});

	socket.on('LEAVE_ROOM', function(data){
		socket.leave(data.roomId);
		console.log('LEAVE_ROOM... roomId : ' + data.roomId);
		
		socket.broadcast.to(data.roomId).emit('SEND_MSG', {
			msg : data.nickName + ' has quit this room.'
		});
	});

	console.log('connection socket');
	socket.emit('CONNECT', {
		type : 'connected'
	});	// socket.emit('CONNECT')

	socket.on('CONNECT', function(data) {
		if(data.type === 'join') {
			console.log('data.type == join');
			console.log('data.roomId : ' + data.roomId);

			socket.join(data.roomId);

			socket.emit('SYSTEM', {
				message : 'welcome to the chatting room!'
			});

			socket.broadcast.to(data.roomId).emit('SYSTEM', {
				message : data.name + ' joined here to GNJ'
			});
		}
	});	// socket.on('CONNECT')

	socket.on('SEND_MESSAGE', function(data) {
			console.log('data room : ' + data.roomId);
			socket.broadcast.to(data.roomId).emit('BROADCAST_MESSAGE', data);
            //db에 저장
	});// SEND_MESSAGE
	
	/*socket.on('disconnect', function(data){
		socket.broadcast.to.(data.roomId).emit('DISCONNECT', {
			msg: data.memberId + ' quit this room...'
		}
	});*/

});	// io.on('connection')
