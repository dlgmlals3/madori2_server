var mongoose = require('mongoose');

exports.connectDB = function(dbName, port) {
  dbUrl = 'mongodb://localhost:' + port + '/' + dbName;
  mongoose.Promice = global.Promise;
  mongoose.connect(dbUrl, {useNewUrlParser: true});
  
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log(dbUrl + ' connected ... ');
  });
  return db;
}

exports.disConnectDB = function(db) {
	 db.close();
}
