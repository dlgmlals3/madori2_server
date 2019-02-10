module.exports = function(app) {
  /* Create member */
  app.post('/member', function(req, res) {
    console.log('POST /member');
    var member = require('../database/schema/member');
    member.insertMember(req, res);
  });

  /* get member */
  app.get('/member/:kakaoId', async function(req, res) {
    console.log('GET /member/:kakaoId');
    var member = require('../database/schema/member');
    await member.findMember(req, res);
  });

  /* update member */
  app.put('/member/:memberId', async function(req, res) {
    console.log('PUT /member/:memberId');
    var member = require('../database/schema/member');
    await member.updateMember(req, res);
  });

  /* delete member */
  app.delete('/member/:memberId', async function(req, res) {
    console.log('DELETE /member/:memberId');
    var member = require('../database/schema/member');
    await member.deleteMember(req, res);
  });


  /* Create Room */
  app.post('/room', function(req, res) {
    console.log('POST /room make room');
    var RoomModel = require('../database/schema/room');
    RoomModel.insertRoom(req, res);
  });

  /* get Room */
  app.get('/room/:memberId', async function(req, res) {
    console.log('GET /room/:memberId');
    var RoomModel = require('../database/schema/room');
    var result = await RoomModel.getRoomElement(req, res);
  });

  /* get Room */
  app.get('/room/member/:memberId', async function(req, res) {
    console.log('GET /room/member/:memberId2');
    var RoomModel = require('../database/schema/room');
    var result = await RoomModel.getRoomMember(req, res);
  });


  /* update room */
  app.put('/room/:memberId', async function(req, res) {
    console.log('PUT /room/:memberId');
    var RoomModel = require('../database/schema/room');
    await RoomModel.updateRoom(req, res);
  });

  /* delete room */
  app.delete('/room/:memberId', async function(req, res) {
    console.log('DELETE /room/:memberId');
    var RoomModel = require('../database/schema/room');
    await RoomModel.deleteRoom(req, res);
  });

  /* get Room List plus searching */
  app.get('/room', async function(req, res) {
    console.log('GET /room get roomList');
    var RoomModel = require('../database/schema/room');
    await RoomModel.getRoomList(req, res);
  });

  /* Search */
  app.get('/room/search/:keyword', async function(req, res) {
    console.log('GET /room get roomList');
    var RoomModel = require('../database/schema/room');
    await RoomModel.getRoomSearch(req, res);
  });

  /* request to room  CRUD */
  app.post('/room/applyRoom', async function(req, res) { 
    var requestModel = require('../database/schema/requestRoom');
    console.log("post /room/applyRoom register apply room"); 
    console.log("RoomMaker Id : " + req.body.requestMemberId +
      ",room ID : " +  req.body.roomId + ", Command : 10");

    if (req.body.requestMemberId == "" || req.body.roomId == "") {
      console.log("roomId or memberID is nothing!!!!! Error !!!!!!!!");
    } else {
      requestModel.insertRequest(req.body.requestMemberId, req.body.roomId, '10', res);
    }
  });

  /* get request info to room */
  app.get('/room/applyRoom/:roomId', async function(req, res) { 
    var requestModel = require('../database/schema/requestRoom');

    console.log("get /room/applyRoom roomId:" + req.params.roomId);
    if (req.params.roomId == "") {
      console.log("roomid is nothing");
    } else {
      requestModel.getRequest(req.params.roomId, res);
    }
  });

  app.put('/room/applyRoom/status', async function(req, res) {
    console.log('PUT /room/applyRoom');
    var requestModel = require('../database/schema/requestRoom');

    console.log("updateRequest memberId : " + req.body.requestMemberId);
    console.log("updateRequest RoomId : " + req.body.roomId);
    console.log("updateRequest RequestStatus : " + req.body.requestStatus);

    if (req.body.requestMemberId == "" || req.body.roomId == "" ||
      req.body.requestStatus == "") {
        console.log('needs item is nothing .. Error ....');
      } else {
        await requestModel.updateRequest(req, res);
      }
  });

  app.delete('/room/applyRoom/status', async function(req, res) { 
    var requestModel = require('../database/schema/requestRoom');
    console.log("delete /room/applyRoom"); 
    console.log("RoomId : " + req.params.roomId + " reuqest ID : " + 
      req.params.requestMemberId);

    if (req.params.requestMemberId == "" || req.params.roomId == "") {
      console.log('needs item is nothing .. Error ....');
    } else {
      await requestModel.deleteRequest(req, res);
    }
  });

  app.get('/myRequestInfo/:memberId', async function(req, res) {
    console.log('get /myRequestInfo');
    var requestModel = require('../database/schema/requestRoom');
    //console.log("my apply Room myId : " + req.params.memberId);
    await requestModel.getRequestRoomInfo(req, res);
  });

  app.get('/requestMemberInfo/:memberId', async function(req, res) {
    console.log('get /requestMemeberInfo');
    var requestModel = require('../database/schema/requestRoom');
    //console.log("my apply Room myId : " + req.params.memberId);
    await requestModel.getRequestMemberInfo(req, res);
  });
}

