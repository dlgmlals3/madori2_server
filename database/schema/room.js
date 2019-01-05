var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var MemberModel = require('./member');

var roomSchema = mongoose.Schema({
  memberId: {type:String, required:true, unique:true},
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

/* Create Room */
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
	var result = await roomObj.save(function (err, savedObj) {
	  if (err) {
			console.log('insertRoom error' + err);
			res.json ({
				statusCode: '500',
				statusMsg: err,
      	total: '0'
			});
		} else if (!savedObj) {
			console.log('insertRoom error' + err);
			res.json ({
				statusCode: '500',
				statusMsg: err,
      	total: '0'
			});
		} else {
			res.json ({
				statusCode: '200',
				statusMsg: 'success',
      	total: '1'
			});
			console.log('Save obj : ' + savedObj);
		}
	})
}

/* get Room */
roomSchema.statics.getRoomElement = async function(req, res) {
	console.log("getRoomElement memberId : " + req.params.memberId);
	await this.findOne (
		{"memberId": req.params.memberId}, function(err, obj) {
			if (err) {
				console.log('getRoomElement err : ' + err);
				res.json({
      		statusCode: '500',
      		statusMsg: err,
      		total: '0'
    		});
			} else if (!obj) {
				console.log('room not found');
    		res.json({
      		statusCode: '200',
      		statusMsg: 'room not found',
      		total: '0'
    		});
			} else {
				console.log('room found success : ' + obj);
					res.json({
					  statusCode: '200',
						statusMsg: 'success',
						total: '1',
						resultItem: {
							memberId: obj.memberId,
							title: obj.title,
							ageMin: obj.ageMin,
							ageMax: obj.ageMax,
							regDate: obj.regDate,
							region: obj.region,
							gender: obj.gender,
							price: obj.price,
							openUrl: obj.openUrl,
							intro: obj.intro,
							maxMemberNum:obj.maxMemberNum,
							registDate: obj.registDate
						}
				 });
		 }
 	});
}

/* Update Room */
roomSchema.statics.updateRoom = async function(req, res) {
	console.log("updateRoom memberId : " + req.params.memberId);
  await this.findOneAndUpdate(
    {memberId : req.params.memberId},
		{$set : 
		  {
				title : req.body.title,
				ageMin: req.body.ageMin,
				ageMax: req.body.ageMax,
				regDate: req.body.regDate,
				region: req.body.region,
				gender: req.body.gender,
				price: req.body.price,
				openUrl: req.body.openUrl,
				intro: req.body.intro,
				maxMemberNum: req.body.maxMemberNum,
				registDate: req.body.registDate
		  }
		},
	  function (err, obj) {
			console.log('test code req : ' + req.body.title);
			if (err) {
				console.log('updateRoom error' + err);
				res.json ({
					statusCode: '500',
	  			statusMsg: err,
        	total: '0'
		   	});
		  } else if (!obj) {
			  console.log('updateRoom error' + err);
			  res.json ({
				  statusCode: '500',
				  statusMsg: err,
      	  total: '0'
			  });
		  } else {
			  res.json ({
				  statusCode: '200',
				  statusMsg: 'success',
      	  total: '0'
			  });
			  console.log('update before obj : ' + obj);
		  }
		});
}

/* delete Room */
roomSchema.statics.deleteRoom = async function(req, res) {
	console.log("deleteRoom : " + req.params.memberId);
	var room = await this.findOneAndDelete(
	  {'memberId': req.params.memberId},
		function (err, obj) {
			if (err) {
				console.log('deleteRoom error' + err);
				res.json ({
					statusCode: '500',
	  			statusMsg: err,
        	total: '0'
		   	});
		  } else if (!obj) {
			  console.log('deleteRoom error' + err);
			  res.json ({
				  statusCode: '500',
				  statusMsg: err,
      	  total: '0'
			  });
		  } else {
			  res.json ({
				  statusCode: '200',
				  statusMsg: 'success',
      	  total: '0'
			  });
			  console.log('delete obj : ' + obj);
		  }
  });
}

roomSchema.statics.getRoomList = async function(req, res) {
	await this.find({},
	function(err, obj) {
	  res.json({
	 		statusCode: '200',
	 		statusMsg: 'success',
	   	total: obj.length,
	   	resultItems:obj 
	 	});
	});
}

/* get RoomId */
roomSchema.statics.getRoomId = async function(memberId) {
  var roomId;
	console.log("getRoomId memberId : " + memberId);
	await this.findOne (
		{"memberId": memberId}, function(err, obj) {
			if (err) {
				console.log('getRoomElement err : ' + err);
			} else if (!obj) {
				console.log('room not found');
			} else {
			  roomId = obj._id;	
		 }
 	});
	return roomId;
}

/* TODO : find all data */
roomSchema.statics.getRoomSearch = async function(req, res) {
	console.log('search keyword : ' + req.params.keyword);
  console.log("keyword is exist");
  await this.find(
  {"title": req.params.keyword },
  function(err, obj) {
	  res.json({
 		  statusCode: '200',
 		  statusMsg: 'success',
      total: obj.length,
      resultItems:obj 
    });
  });
}

roomSchema.statics.deleteAllRoom = async function() {
	let result = await this.remove({});
}

var getRoomCount = function() {
	return 30; // after is modified...
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
/*
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
*/
autoIncrement.initialize(mongoose.connection);
roomSchema.plugin(autoIncrement.plugin, {
	model: 'rooms',
	field: 'roomId',
	startAt: 1
});
module.exports = mongoose.model('rooms', roomSchema);
