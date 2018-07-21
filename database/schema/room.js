var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
  title: String,
  ageMin: Number,
  ageMax: Number,
  date: Number,
  gender: Number,
  price: Number,
  openUrl: String,
  explain: String
});

roomSchema.statics.insertRoom = function(req, res) {
  roomObj = new this();
  roomObj.title = req.body.title;
  roomObj.ageMin = req.body.ageMin;
  roomObj.ageMax = req.body.ageMax;
  roomObj.regDate = req.body.regDate;
  roomObj.gender = req.body.gender;
  roomObj.price = req.body.price;
  roomObj.openUrl = req.body.openUrl;
  roomObj.intro = req.body.explain;

  return roomObj.save(function(err) {
    returnResult(err, res);
  })
}

roomSchema.statics.getRoomList = function(err) {
  this.find({}, function(err, docs) {
    var result = new Array();
    for (var i = 0, size = docs.length; i < size; i++) {
      /* TODO Hecules all item */
      var roomObj = new Object();
      roomObj.title = docs[i].title;
      roomObj.ageMin = docs[i].ageMin;
      result.push(roomObj);
    }
    var jsonData = JSON.stringify(result);
    //console.log(jsonData);
    return jsonData;
  })
}

roomSchema.statics.getRoomElement = function(req, res, callback) {
  return this.find({
    title: title
  }, callback);
}

/* TODO */
roomSchema.statics.updateRoom = function(req, res) {
  Room.findById(req.params.roomId, function(err, rooms) {
    if (err) return console.log('database failure');
    if (!rooms) return console.log('room not found');

    console.log(req.body.title);

    if (req.body.title) rooms.title = req.body.title;
    if (req.body.agMin) rooms.ageMin = req.body.ageMin;
    if (req.body.ageMax) rooms.ageMax = req.body.ageMax;
    if (req.body.regDate) rooms.date = req.body.date;
    if (req.body.gender) rooms.gender = req.body.gender;
    if (req.body.price) rooms.price = req.body.price;
    if (req.body.openUrl) rooms.openUrl = req.body.openUrl;
    if (req.body.explain) rooms.explain = req.body.explain;

    room.save(function(err) {
      returnResult(err, res);
    });
    return res;
  })
}

roomSchema.statics.deleteRoom = function(req, res) {
  Room.remove({
      title: req.params.roomId
    },
    function(err, output) {
      returnResult(err, res);
    }
  );
  return res;
}

var returnResult = function(err, res) {
  if (err) {
    res.status(500).send({
      error: 'database failure'
    });
  }
  /*res.json({
    statusCode: '200',
    statusMsg: 'success'
  });*/
}

module.exports = mongoose.model('room', roomSchema);