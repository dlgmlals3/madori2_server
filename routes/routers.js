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

	/* 내 방에 신청한 사람 보기 */
  app.get('/room/applyRoom/:memberId', async function(req, res) { 
		/* TODO */
	  console.log("get /room/applyRoom show requested member:" + req.params.memberId);
		res.json({
			statusCode: '200',
			statusMsg: 'success',
			total: '2',
			resultItems: [
		    {
				  memberId: 'dlgmlals3'
			  },
				{
					memberId: 'gjrbdnjs'
				}
			]
		});
	});

	app.post('/room/applyRoom', async function(req, res) { 
		/* TODO */
	  console.log("post /room/applyRoom register apply room"); 
	  console.log("RoomMaker Id : " + req.body.memberId + "reuqest ID : " + 
			req.body.requestMemberId);
	});

	app.delete('/room/applyRoom', async function(req, res) { 
		/* TODO */
	  console.log("delete /room/applyRoom"); 
	  console.log("RoomMaker Id : " + req.body.memberId + "reuqest ID : " + 
			req.body.requestMemberId);
	});

	/* 멤버는 자신이 신청한 방장의 멤버아이디를 가지고 있어야함 */
	/* 내가 신청한 방보기 */
	app.get('/room/applyRoom/:memberId', async function(req, res) { 
	  console.log("appliedRoom myId : " + req.params.memberId);
		var RoomModel = require('../database/schema/room');
		await RoomModel.getRoomElement(req, res);

		res.json({
			statusCode: '200',
			statusMsg: 'success',
			total: '1',
			resultItems: [{
				memberId: res.memberId,
				title: res.title,
				ageMin: res.ageMin,
				ageMax: res.ageMax,
				regDate: res.regDate,
				region: res.region,
				gender: res.gender,
				price: res.price,
				openUrl: res.openUrl,
				intro: res.intro,
				maxMemberNum:res.maxMemberNum,
				registDate: res.registDate
			}]
		});
	});
}

