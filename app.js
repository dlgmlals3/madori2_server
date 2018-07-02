var express =require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');


//mongodb 모듈 사용
//var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
//mongodb 연결

var app = express();
//미들웨어 등록
app.set('port',process.env.PORT || 3000);
/*app.use('/room',static(path.join(__dirname,'room')));*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//var db = mongoose.connection;
//db.on('error', function(){
  //   console.log("Connection Failed");
//});
//db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
//    console.log("Connected to mongod server");
//});

//mongoose.connect('mongodb://localhost:27017/local');


/*
app.use(cookieParser());

app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));
*/
/*
function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local';
    //몽구스 초기설정
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('open', function() {
        console.log('데이터베이스에 연결됨 : ' + databaseUrl);
        
        createUserSchema(database);
    });
        
    database.on('disconnected',function() {
        console.log('데이터베이스 연결 끊어짐.');
    });
    
    database.on('error',console.error.bind(console,'mongoose 연결 에러'));
    
    app.set('database',database);
}*/
/*
function createUserSchema(database) {
    
     database.user_schema = require('./database/room').createSchema(mongoose);
    
    UserModel = mongoose.model('users3',database.UserSchema);
    console.log('UserModel 정의함.');
}*/


//스키마를 정의한 room.js 불러오기
var Room = require('./database/room');
//router를 정의한 routes.js에 app (express) 정보와 Room 스키마 정보 파싱
var router = require('./routes/routers')(app,Room);


var errorHandler = expressErrorHandler({
    static:{
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 웹 서버를 실행함' + app.get('port'));
});
