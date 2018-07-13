var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  title: String,
  ageMin: Number,
  ageMax: Number,
  regDate: Number,
  gender: Number,
  price: Number,
  openUrl: String,
  explain: String
});


var updateRoom = function(req, res) {

  Room.findById(req.params.roomId, function(err, room) {
    if (err) return res.status(500).json({
      error: 'database failure'
    });
    if (!room) return res.status(404).json({
      error: 'room not found'
    });

    if (req.body.title) room.title = req.body.title;
    if (req.body.ageMin) room.ageMin = req.body.ageMin;
    if (req.body.ageMax) room.ageMax = req.body.ageMax;
    if (req.body.regDate) room.regDate = req.body.regDate;
    if (req.body.gender) room.gender = req.body.gender;
    if (req.body.price) room.price = req.body.price;
    if (req.body.openUrl) room.openUrl = req.body.openUrl;
    if (req.body.explain) room.explain = req.body.explain;

    room.save(function(err) {
      if (err) res.status(500).json({
        error: 'failed to update'
      });
      res.json({
        statusCode: '200',
        statusMsg: 'success'
      });
    })

  })
}

var deleteRoom = function(req, res) {
  Room.remove({
      title: req.params.roomId
    },
    function(err, output) {
      if (err) return res.status(500).json({
        error: "database failure"
      });

      if (!output.result.n) return res.status(404).json({
        error: 'room not found'
      });

      res.json({
        statusCode: '200',
        statusMsg: 'success'
      });
      res.status(204).end();
    })
}

var insertRoom = function(req, res) {
  var room = new Room();

  room.title = req.body.title;
  room.ageMin = req.body.ageMin;
  room.ageMax = req.body.ageMax;
  room.regDate = req.body.regDate;
  room.gender = req.body.gender;
  room.price = req.body.price;
  room.openUrl = req.body.openUrl;
  room.intro = req.body.explain;

  room.save(function(err) {
    if (err) {
      return res.status(500).send({
        error: 'database failure'
      });
    }
    res.json({
      statusCode: '200',
      statusMsg: 'success'
    });
  })
}

var getRoomList = function(req, res) {
  Room.find(function(err, rooms) {
    if (err) {
      return res.status(500).send({
        error: 'database failure'
      });
    }
    res.json({
      statusCode: '200',
      statusMsg: 'success',
      total: '2',
      resultList: json(rooms)
    });
  })
}

module.exports = mongoose.model('room', roomSchema);
