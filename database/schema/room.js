var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var MemberModel = require('./memberSchema');

var roomSchema = mongoose.Schema({
  /*dlgmlals3 TODO Insert PK 해서 중복 데이터 안되게 */
  memberId: {type:String, required:true},
	title: {type:String, required:true},
	ageMin: {type:Number,default:20},
	ageMax: {type:Number,default:30},
	regDate: {type:Date, required:true}, /* minwoo */
	region: {type:String, required:true},
	gender: {type:String, required:true},
	price: {type:Number, required:true},
	openUrl: {type:String, required:true},
	intro: String,
	maxMemberNum: Number,
	registDate: {type:Date,default: Date.now}, /* server from */
	//createrId: {type:mongoose.Schema.Types.ObjectId, ref: 'member',required:true},
	//createrId: {type:mongoose.Schema.Types.ObjectId, ref: 'member'},
	//memberId: [{type:mongoose.Schema.Types.ObjectId, ref: 'member'}]
});
/*
	memberSchema.statics.findRoomId= async function(req,res){
		console.log('find... Room Id');
		var room = await this.findOne({
			'roomId':req.body.roomId
		});
		console.log(req.body.roomId);
		var result;
		if(!member){
			console.log('room not found');
		}else{

			result = room._id;

		}
		return result;
	}
*/

roomSchema.statics.insertRoom = async function(req, res) {
	roomObj = new this({
    memberId: req.body.memberId,
		title: req.body.title,
		ageMin: req.body.ageMin,
		ageMax: req.body.ageMax,
		regDate: req.body.regDate,
		region: req.body.region,
		gender: req.body.gender,
		price: req.body.price,
		openUrl: req.body.openUrl,
		intro: req.body.intro,
		maxMemberNum: req.body.maxMemberNum,
		registDate: req.body.registDate,
		createrId: req.body.createrId
	});
	let result = await roomObj.save({
		//returnResult(err, res);
	});
}

roomSchema.statics.getRoomList = async function() {
	let resultFind = await this.find({}).limit(getRoomCount());
	return resultFind;
}

var getRoomCount = function() {
	return 30; // after is modified...
}

roomSchema.statics.deleteAllRoom = async function() {
	let result = await this.remove({});
}

roomSchema.statics.updateRoom = async function(reqParam, reqBody) {
	console.log("updateRoom memberId : " + reqParam.params.memberId);
	var room = await this.findOne ({
    "memberId" : reqParam.params.memberId
  });
	console.log("room : " + room);

	if (!room) {
		console.log('room not found');
		return false;
	} else {
  	let resultUpdate = await room.update (
       { memberId : reqParam.params.memberId },
       { set : reqBody.body });
    return true;
  }
/*
	this.update({roomId:req.params.roomId}, {&set:req:body},function(err,output){
		if(err) res.status(500).json({error:'database failure'});
		console.log("update output : " + output);
		if(!output.n) return res.status(404).json({error: 'book not found'});
		})
  result = await room.save();
*/	
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
		console.log('room found : ' + room.memberId);
    if (room.memberId) res.memberId = room.memberId;
    if (room.title) res.title = room.title;
    if (room.ageMin) res.ageMin = room.ageMin;
    if (room.ageMax) res.ageMax = room.ageMax;
    if (room.regDate) res.regDate = room.regDate;
    if (room.region) res.region = room.region;
    if (room.gender) res.gender = room.gender;
    if (room.price) res.price = room.price;
    if (room.openUrl) res.openUrl = room.openUrl;
    if (room.intro) res.intro = room.intro;
    if (room.registDate) res.registDate = room.registDate;
    if (room.maxMemberNum) res.maxMemberNum = room.maxMemberNum;
    return true;
	}
}

roomSchema.statics.deleteRoom = async function(req, res) {
	console.log("deleteRoom : " + req.params.memberId);
	var room = await this.findOne({
		'memberId': req.params.memberId
	});
	if (!room) {
		console.log('room not found');
		return false;
	} else {
    console.log("room found title : " + room.title);
    await room.remove();
    return true;
  }
}

roomSchema.statics.existRoom = async function(req,res){
	console.log('find... my room');
	var room = await this.findOne({
		'memberId':req.params.memberId
	});
	console.log(req.params.memberId);
	var result;
	if(!room) {
		console.log('room not found');
		result = false;

	} else {
		console.log('exist room');
		result = true;
	}
	return result;
}

roomSchema.statics.joinRoom = async function(req,res){
	console.log('join... room');

	var room = await this.findOne({
		'roomId':req.body.roomId
	});
	console.log('room :'+ room);
	var result;
	if(!room){
		console.log('room not found');
		result = false;
	}else{
		console.log('join successes');
		console.log('mememeberId' + req.body.memberId);
		room.memberId.push(req.body.memberId);
		console.log('room status : '+ room.memberId);
		result = await room.save();
	}
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
