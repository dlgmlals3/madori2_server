module.exports = function(app) {

	app.get('/room', async function(req, res) {
		console.log('GET /room call router');
   	var RoomModel = require('../database/schema/room');
		let resultRows = await RoomModel.getRoomList();
		if (resultRows != null) {
			resultStatus = 'success';
		}

		let pageCount = resultRows.length;

		console.log("result : " + pageCount);
		res.json({
						statusCode: '200',
						statusMsg: resultStatus,
						total: pageCount,
						resultList: resultRows
		});
/*		res.json({
			statusCode: '200',
			statusMsg: 'success',
			total: '2',
			resultList: [{
				roomId: '_id1',
				title: 'dlgmlals',
				ageMin: '30',
				ageMax: '40',
				gender: 'm',
				price: '50000',
				openUrl: 'asdfasdf',
				intro: '123213'
			},
				{
					roomId: '_id2',
					title: 'gjrbdnjs',
					ageMin: '30',
					ageMax: '40',
					gender: 'm',
					price: '50000',
					openUrl: 'asdfasdf',
					intro: '123213'
				}
			]
		});
*/
	});

	app.post('/room', function(req, res) {
		console.log('POST /room');
		var RoomModel = require('../database/schema/room');
		var bodyReq = castBody(req);

		console.log(bodyReq);

		RoomModel.insertRoom(bodyReq);

		res.json({
			statusCode: '200',
			statusMsg: 'success'
		});
	});

	app.get('/room/:roomId', function(req, res) {
		console.log('GET /room/:roomId');
		res.json({
			statusCode: '200',
			statusMsg: 'success',
			result: {
				roomId: '_id2',
				title: 'gjrbdnjs',
				ageMin: '30',
				ageMax: '40',
				date: '2016-02-13',
				place: '11',
				gender: 'm',
				price: '50000',
				openUrl: 'asdfasdf',
				intro: '123213',
				maxMemberNum: '3',
				registDate: '2016-02-13'
			}
		});
	})

	app.put('/room/:roomId', function(req, res) {
		console.log('PUT /room/:roomId');
		var RoomModel = require('../database/schema/room');
		var reqBody = castBody(req);
		var reqParam = castParam(req);
		console.log(req);
		RoomModel.updateRoom(reqParam,reqBody);
		console.log(reqParam);
		console.log(reqBody);
		res.json({
			statusCode: '200',
			statusMsg: 'success'
		});

	})

	app.delete('/room/:roomId', function(req, res) {
		console.log('DELETE /room/:roomId');
		res.json({
			statusCode: '200',
			statusMsg: 'success'
		});

	})


	app.get('/room/list/:keyword', function(req, res) {
		console.log('GET /room/list/:keyword');
		var keyword = req.query.keyword;

		res.json({
			statusCode: '200',
			statusMsg: 'success',
			total: '2',
			resultList: [{
				roomId: '_id1',
				title: 'dlgmlals',
				ageMin: '30',
				ageMax: '40',
				gender: 'm',
				price: '50000',
				openUrl: 'asdfasdf',
				intro: '123213'
			},
				{
					roomId: '_id2',
					title: 'gjrbdnjs',
					ageMin: '30',
					ageMax: '40',
					gender: 'm',
					price: '50000',
					openUrl: 'asdfasdf',
					intro: '123213'
				}
			]
		});

	});

	app.get('/member/requester-room/:roomId', function(req, res) {
		res.json({
			statusCode: '200',
			statusMsg: 'success',
			total: '2',
			resultList: [{
				memberId: 'dlgmlals3'
			},
				{
					memberId: 'gjrbdnjs'
				}
			]
		});

	})

	app.post('/room/requester-room', function(req, res) {
		res.json({
			statusCode: '200',
			statusMsg: 'success'
		});
	})

	app.get('/room/requester-room/:memberId', async function(req, res) {
		console.log("requester-room memberId : " + req.params.memberId);

		var RoomModel = require('../database/schema/room');
		await RoomModel.getRoomElement(req, res);

		res.json({
			statusCode: '200',
			statusMsg: 'success',
			total: '1',
			resultList: [{
				memberId: res.memberId,
				title: res.title,
				ageMin: res.ageMin,
				ageMax: res.ageMax,
				regDate: res.regDate,
				place: res.place,
				gender: res.gender,
				price: res.price,
				openUrl: res.openUrl,
				intro: res.intro,
				maxMemberNum:res.maxMemberNum,
				registDate: res.registDate
			}]
		});

	});

	app.delete('/room/requester-room/:memberId', function(req, res) {
		res.json({
			statusCode: '200',
			statusMsg: 'success'
		});
	});


	app.post('/member',function(req,res){
		console.log('POST /member');
		var request = req.body.userId;
		res.json({
			statusCode: '200',
			statusMsg: 'success',
			resultList : request
		});
	});

	app.get('/getUserinfo/:userId', function(req, res) {
		console.log('GET /getUserInfo' + req);
		var request = req.params.userId;

		res.json({
			statusCode: '200',
			statusMsg: 'success',
	//		resultList : request
		});
	});

	app.get('/room/isExistMyroom/:memberId', async function(req, res) {
		console.log('GET /room/isExistMyroom');
		var RoomModel = await require('../database/schema/room');
		var result = await RoomModel.existRoom(req);

		res.json({
			statusCode: '200',
			statusMsg: 'success',
			resultList : result
		});
	});
};


function castBody(req) {

	var temp = {};
	temp = JSON.stringify(req.body);
	var result = {body: ''};
	result.body = JSON.parse(temp.replace(/\:\"(\d+)\"([,\}])/g, '\:$1$2'));
	return result;
}

function castParam(req){
	var temp = {};
	temp = JSON.stringify(req.params);
	var result = {params:''};
	result.params = JSON.parse(temp.replace(/\:\"(\d+)\"([,\}])/g, '\:$1$2'));
	return result;
}





