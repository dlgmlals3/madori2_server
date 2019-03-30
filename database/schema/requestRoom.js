var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var roomModel = require('./room');
var memberModel = require('./member');

var requestRoomSchema = mongoose.Schema({
    memberId:{type:mongoose.Schema.Types.ObjectId, ref: 'members'},
    roomId:{type:mongoose.Schema.Types.ObjectId, ref: 'rooms'},
    requestStatus:{type:String,required:true}
    //memberId : {type:String, ref: 'members'},
});
requestRoomSchema.index({'memberId':1, 'roomId':1, 'requestStatus':1}, {unique: true});

requestRoomSchema.statics.insertRequest = async function(requestMemberId, roomObjId, status, res) {
    result = await this.findOneAndUpdate(
            { memberId : requestMemberId,
                roomId : roomObjId,
            },
            {$set :
                {
                    requestStatus : status
                }
            },
            { upsert: true },
            function (err, obj) {
                if (err) {
                    console.log('insertRequest error ' + err);
                    res.json ({
                        statusCode: '500',
                        statusMsg: err,
                        total: '0'
                    });
                } else if (obj) {
                    console.log('data is duplicated ' + err);
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

requestRoomSchema.statics.getCountRequest = async function(roomObjId, res){
    return await this.find ({'roomId': roomObjId
        ,'requestStatus': '10' }).countDocuments();
}

requestRoomSchema.statics.getRequest = async function(roomObjId, res){
  await this.find (
      {"roomId": roomObjId
      }).populate('memberId').exec((err, obj) => {
        //}).exec((err, obj) => {
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
  await this.findOneAndUpdate(
      {memberId : req.body.requestMemberId,
        roomId : req.body.roomId,
      },
      {$set :
        {
          requestStatus : req.body.requestStatus
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
  var room = await this.findOneAndDelete(
      {'memberId': req.params.requestMemberId,
        'roomId': req.params.roomId},
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

requestRoomSchema.statics.deleteRequestAboutRoom = async function(roomId) {
    console.log("deleteRequestAboutRoom ", roomId);
    var room = await this.findOneAndDelete(
        {'roomId': roomId},
        function (err, obj) {
            if (err) {
                console.log('deleteRequestAboutRoom error' + err);
            } else if (!obj) {
                console.log('deleteRequestAboutRoom error' + err);
            } else {
                console.log('deleteRequestAboutRoom Success: ' + obj);
            }
    });
}

requestRoomSchema.statics.getRequestRoomInfo = async function(req, res) {
  console.log("getRequestRoomInfo : " + req.params.memberId);

  await this.find (
      {"memberId": req.params.memberId
      }).populate('roomId').exec((err, data) => {
        if (err) {
          console.log('getMyRequest err : ' + err);
          res.json({
            statusCode: '500',
            statusMsg: err,
            total: '0'
          });
        } else if (!data) {
          console.log('getMyRequest not found');
          res.json({
            statusCode: '200',
            statusMsg: 'room not found',
            total: '0'
          });
        } else {
          res.json({
            statusCode: '200',
            statusMsg: 'success',
            total: data.length,
            resultItems:data
          });
          console.log('data : ' + data);
        }
      });
}

requestRoomSchema.statics.getRequestMemberInfo = async function(req, res) {
  console.log("getRequestMemberInfo : " + req.params.memberId);
    // find roomId from memberId
    var roomId = await roomModel.getRoomId(req.params.memberId);
    var result = await this.find (
            {"roomId": roomId
            }).populate('memberId').exec((err, data) => {
                if (err) {
                    console.log('getRequestMemberInfo err : ' + err);
                    res.json({
                        statusCode: '500',
                        statusMsg: err,
                        total: '0'
                    });
                } else if (!data) {
                    console.log('getRequestMemberInfo not found');
                    res.json({
                        statusCode: '200',
                        statusMsg: 'room not found',
                        total: '0'
                    });
                } else {
                    res.json({
                        statusCode: '200',
                        statusMsg: 'success',
                        total: data.length,
                        resultItems:data
                    });
                    console.log('data : ' + data);
                }
            });
}

module.exports = mongoose.model('requestRoom',requestRoomSchema);

    /*
       requestObj = new this({
       memberId:requestMemberId,
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
       */

