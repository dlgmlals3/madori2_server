var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var roomSchema = mongoose.Schema({
  roomId: {
    type: Number,
    default: 1
  },
  memberId: String,
  title: String,
  ageMin: Number,
  ageMax: Number,
  regDate: String,
  location: String,
  gender: String,
  price: Number,
  openUrl: String,
  intro: String,
  maxMemberNum: String,
  registDate: String
});

roomSchema.statics.insertRoom = async function(req, res) {
  roomObj = new this({
    memberId: req.body.memberId,
    title: req.body.title,
    ageMin: req.body.ageMin,
    ageMax: req.body.ageMax,
    regDate: req.body.regDate,
    location: req.body.location,
    gender: req.body.gender,
    price: req.body.price,
    openUrl: req.body.openUrl,
    intro: req.body.intro,
    maxMemberNum: String,
    registDate: String
  });
  let result = await roomObj.save({
    //returnResult(err, res);
  });
}

roomSchema.statics.getRoomList = async function() {
  let resultFind = await this.find({});
  return resultFind;
}

roomSchema.statics.deleteAllRoom = async function() {
  let result = await this.remove({});
}

roomSchema.statics.updateRoom = async function(req, res) {
  console.log("find req roomId : " + req.params.roomId);
  var room = await this.findOne({
    'memberId': req.params.memberId
  });
  if (!room) {
    console.log('room not found');
    return false;
  }
  if (req.body.memberId) room.memberId = req.body.memberId;
  if (req.body.title) room.title = req.body.title;
  if (req.body.agMin) room.ageMin = req.body.ageMin;
  if (req.body.ageMax) room.ageMax = req.body.ageMax;
  if (req.body.regDate) room.date = req.body.regDate;
  if (req.body.location) room.location = req.body.location;
  if (req.body.gender) room.gender = req.body.gender;
  if (req.body.price) room.price = req.body.price;
  if (req.body.openUrl) room.openUrl = req.body.openUrl;
  if (req.body.explain) room.explain = req.body.explain;
  result = await room.save();
  return true;
}

roomSchema.statics.getRoomElement = async function(req, res) {
  console.log("find req roomId : " + req.params.memberId);

  var room = await this.findOne({
    "memberId": req.params.memberId
  });

  if (!room) {
    console.log('room not found');
    return false;
  } else {
    console.log('room found really : ' + room.memberId);
  }

  if (room.memberId) res.memberId = room.memberId;
  if (room.title) res.title = room.title;
  if (room.agMin) res.ageMin = room.ageMin;
  if (room.ageMax) res.ageMax = room.ageMax;
  if (room.regDate) res.date = room.regDate;
  if (room.location) room.location = room.location;
  if (room.gender) res.gender = room.gender;
  if (room.price) res.price = room.price;
  if (room.openUrl) res.openUrl = room.openUrl;
  if (room.intro) res.intro = room.intro;
  if (room.location) res.location = room.location;
  if (room.explain) res.explain = room.explain;

  //console.log("server memberId :" + res.memberId + " " + res.title)
  return true;
}


roomSchema.statics.deleteRoom = async function(req, res) {
  console.log("find req roomId : " + req.params.roomId);
  var room = await this.findOne({
    'roomId': req.params.roomId
  });
  if (!room) {
    console.log('room not found');
    return null;
  }
  console.log("room found title : " + room.title);
  await room.remove();
  return true;
}


autoIncrement.initialize(mongoose.connection);
roomSchema.plugin(autoIncrement.plugin, {
  model: 'rooms',
  field: 'roomId',
  startAt: 1
});
module.exports = mongoose.model('rooms', roomSchema);
/*
var returnResult = function(err, res) {
	if (err) {
		res.status(500).send({
			error: 'database failure'
		});
	}
	*/
/*res.json({
	statusCode: '200',
	statusMsg: 'success'
});*/