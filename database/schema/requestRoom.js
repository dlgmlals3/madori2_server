var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var requestRoomSchema = mongoose.Schema({
		memberId : {type:String,required:true},
		roomId:{type:mongoose.Schema.Types.ObjectId,ref:'room'},
		requestStatus : {type:String,required:true}
});
requestRoomSchema.index({'memberId':1, 'roomId':1, 'requestStatus':1}, {unique: true});

requestRoomSchema.statics.insertRequest = async function(req, roomObjId, status, res) {
	requestObj = new this({
		memberId:req.body.requestMemberId,
		roomId:roomObjId,
		requestStatus:status
	});
	var result = await requestObj.save(function (err, savedObj) {
	  if (err) {
			console.log('insertRequest error' + err);
			res.json ({
				statusCode: '500',
				statusMsg: err,
      	total: '0'
			});
		} else if (!savedObj) {
			console.log('insertRequest error' + err);
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

requestRoomSchema.statics.getRequest = async function(roomObjId, res){
	console.log("getRequest RoomId : " + roomObjId);
  await this.find (
		{"roomId": roomObjId, "requestStatus": "request"}, function(err, obj) {
			if (err) {
				console.log('getRequest err : ' + err);
				res.json({
      		statusCode: '500',
      		statusMsg: err,
      		total: '0'
    		});
			} else if (!obj) {
				console.log('request not found');
    		res.json({
      		statusCode: '200',
      		statusMsg: 'room not found',
      		total: '0'
    		});
			} else {
				console.log('request found success : ' + obj);
					res.json({
					  statusCode: '200',
						statusMsg: 'success',
						total: obj.length,
						resultItems:obj
				 });
		 }
 	});
}

requestRoomSchema.statics.updateRequest = async function(req, res) {
	console.log("updateRequest memberId : " + req.params.memberId);
  await this.findOneAndUpdate(
    {memberId : req.params.memberId},
		{$set : 
		  {
				requestStatus : "approved"
		  }
		},
	  function (err, obj) {
			if (err) {
				console.log('updateRequest error' + err);
				res.json ({
					statusCode: '500',
	  			statusMsg: err,
        	total: '0'
		   	});
		  } else if (!obj) {
			  console.log('updateRequest error' + err);
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
		  }
		});
}

requestRoomSchema.statics.deleteRequest = async function(req, res) {
	console.log("deleteRequest : " + req.params.memberId);
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

requestRoomSchema.statics.getMyRequestInfo = async function(req, res) {
 	// _id-room and roomID-request join
	// memberID search in memberID-request .....
	// res have it...
}

/*
requestRoomSchema.statics.findMemberId = async function(req,res){
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

requestRoomSchema.statics.joinMember = async function(req,res){
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
}*/

module.exports = mongoose.model('requestRoom',requestRoomSchema);
