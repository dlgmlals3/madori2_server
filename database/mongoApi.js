exports.connectDB = function(MongoClient) {
  var databaseUrl = 'mongodb://localhost:27017/local';

  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) {
      console.log('db connectino Error !!' + err);
      return -1;
    }
    console.log('db connection success : ' + databaseUrl);
    return db;
  });
}

exports.findPassword = function(db, id) {
  console.log('findPassword ID : ' + id);
}
