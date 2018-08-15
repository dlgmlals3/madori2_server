var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var requestRoom = mongoose.Schema({
	memberId: String,
	providerId: String,
});

requestRoom.statics.insert = async function(req, res) {
	requestRoomObj = new this({
		memberId: req.body.memberId,
		providerId: req.body.providerId,
	});
	let result = await requestRoomObj.save({
		//returnResult(err, res);
	});
}

requestRoom.statics.getList = async function() {
	let resultFind = await this.find({});
	return resultFind;
}

requestRoom.statics.deleteAll = async function() {
	let result = await this.remove({});
}

requestRoom.statics.getElement = async function(req, res) {
/*
	console.log("find req roomId : " + req.params.roomId);
	var room = await this.findOne({
		'roomId': req.params.roomId
	});
	if (!room) {
		console.log('room not found');
		return false;
	}
	return true;
*/
}

/*
requestRoom.statics.deleteRoom = async function(req, res) {
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
*/

autoIncrement.initialize(mongoose.connection);
//requestRoom.plugin(autoIncrement.plugin,{model:'rooms',field:'roomId', startAt :1});
module.exports = mongoose.model('requestRoom', requestRoom);
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
