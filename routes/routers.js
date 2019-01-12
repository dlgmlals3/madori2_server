module.exports = function(app) {
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
	})

  /* update room */
	app.put('/room/:memberId', async function(req, res) {
		console.log('PUT /room/:memberId');
		var RoomModel = require('../database/schema/room');
		await RoomModel.updateRoom(req, res);
	})

  /* delete room */
	app.delete('/room/:memberId', async function(req, res) {
		console.log('DELETE /room/:memberId');
		var RoomModel = require('../database/schema/room');
		await RoomModel.deleteRoom(req, res);
	})

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

	/* todo */
	// 2 query is only 1.....

	/* request to room  CRUD */
	app.post('/room/applyRoom', async function(req, res) { 
	  console.log("post /room/applyRoom register apply room"); 
	  console.log("RoomMaker Id : " + req.body.memberId + " reuqest ID : " + 
			req.body.requestMemberId);
		// find room id from room using memberID
		var RoomModel = require('../database/schema/room');
		var roomId = await RoomModel.getRoomId(req.body.memberId);
		console.log("room id : " + roomId);
		// insert requestMemberId, roomId, status = "request"
		if (roomId) {
		  var requestModel = require('../database/schema/requestRoom');
		  requestModel.insertRequest(req, roomId, "request", res);
		}
	});

  /* get request info to room */
  app.get('/room/applyRoom/:memberId', async function(req, res) { 
	  console.log("get /room/applyRoom show requested member:" + req.params.memberId);
		// find room id from room using memberID
		var RoomModel = require('../database/schema/room');
		var roomId = await RoomModel.getRoomId(req.params.memberId);
	  // get request	
		if (roomId) {
		  var requestModel = require('../database/schema/requestRoom');
		  requestModel.getRequest(roomId, res);
		}
	});

	app.put('/room/applyRoom/:memberId', async function(req, res) {
		console.log('PUT /room/applyRoom/:memberId');
		var requestModel = require('../database/schema/requestRoom');
		await requestModel.updateRequest(req, res);
	})

	app.delete('/room/applyRoom', async function(req, res) { 
	  console.log("delete /room/applyRoom"); 
	  console.log("RoomMaker Id : " + req.body.memberId + " reuqest ID : " + 
			req.body.requestMemberId);
		var requestModel = require('../database/schema/requestRoom');
		await requestModel.deleteRequest(req, res);
	});

	app.get('/room/myApplyInfo/:memberId', async function(req, res) { 
	  console.log("my apply Room myId : " + req.params.memberId);
		console.log('GET /room get roomList');
		var RoomModel = require('../database/schema/room');
		//await requestModel.getMyRequestInfo(req, res);
	});
}

