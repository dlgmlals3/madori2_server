module.exports = function(app) {

  app.get('/room', function(req, res) {
    console.log('GET /room call router');
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

	app.post('/room', function(req, res) {
		console.log('POST /room');
		var mongooseApi = require('../database/mongooseApi');
		var RoomModel = require('../database/schema/room');

		var dbName = app.get('dbName');
	  var dbPort = app.get('dbPort');
		mongooseApi.connectDB(dbName, dbPort);
		var bodyReq = castReq(req);

		console.log(bodyReq);

		RoomModel.insertRoom(bodyReq);

		res.json({
			statusCode: '200',
			statusMsg: 'success'
		});
	});

//iso stting
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
	location : 'seoul',
        gender: 'm',
        price: '50000',
        openUrl: 'asdfasdf',
        intro: '123213',
	maxMemberNum : '3',
	registDate: '2016-02-13'
      }
    });
  })

  app.put('/room/:roomId', function(req, res) {
    console.log('PUT /room/:roomId 라우팅 함수에서 호출');
    res.json({
      statusCode: '200',
      statusMsg: 'success'
    });

  })

  app.delete('/room/:roomId', function(req, res) {
    console.log('DELETE /room/:roomId 라우팅 함수에서 호출');
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

  app.get('/room/requester-room/:memberId', function(req, res) {
    res.json({
      statusCode: '200',
      statusMsg: 'success',
      total: '2',
      resultList: [{
          roomId: '_id1',
          title: '홍대 그라에서 놀고싶다...',
          ageMin: '30',
          ageMax: '40',
          gender: 'm',
          price: '50000',
          openUrl: 'asdfasdf@kakao',
          intro: '123213',
					place: '홍대',
				  date: '2018/08/07',
        },
        {
          roomId: '_id2',
          title: '강남 클럽에서 놀고싶네...',
          ageMin: '30',
          ageMax: '40',
          gender: 'm',
          price: '1000000',
          openUrl: 'asdfasdf@kakao',
          intro: '123213',
      		place: '강남',
				  date: '2018/08/08'
        }
      ]
    });
  });

  app.delete('/room/requester-room/:memberId', function(req, res) {
    res.json({
      statusCode: '200',
      statusMsg: 'success'
    });
  })

}


function castReq(req){

	var temp ={};
	temp = JSON.stringify(req['body']);
	var result ={body:''};
	result.body = JSON.parse(temp.replace(/\:\"(\d+)\"([,\}])/g, '\:$1$2'));
	return result;
}
