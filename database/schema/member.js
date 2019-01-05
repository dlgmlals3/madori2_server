var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var memberSchema = mongoose.Schema({
		memberId : {type:String,required:true},
		myRoomObjId:{type:mongoose.Schema.Types.ObjectId,ref:'room'},
		roomObjId:[{type:mongoose.Schema.Types.ObjectId,ref:'room'}]
});

memberSchema.statics.insertMember = async function(req,res) {
	memberObj = new this({
		memberId:req.body.memberId
	});
	let result = await memberObj.save({});
}

memberSchema.statics.findMemberId = async function(req,res){
	console.log('find... Member Id');
	var member = await this.findOne({
		'memberId':req.body.memberId
	});
	console.log(req.body.memberId);
	var result;
	if(!member){
		console.log('member not found');
	}else{
		result = member._id;
	}
	return result;
}
memberSchema.statics.joinMember = async function(req,res){
  console.log('join... Member');

  var room = await this.findOne({
	  'roomId':req.body.roomId
  });

  console.log('room :'+ room);
  var result;
  if(!room){
	  console.log('room not found');
	  result = false;
  } else {
	  console.log('join successes');
	  console.log('mememeberId' + req.body.memberId);
	  room.memberId.push(req.body.memberId);
	  console.log('room status : '+ room.memberId);
	  result = await room.save();
  }
 }

module.exports = mongoose.model('member',memberSchema);
