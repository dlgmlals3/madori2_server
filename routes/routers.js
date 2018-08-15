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
    var RoomModel = require('../database/schema/room');
    var bodyReq = castReq(req);

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
        location: 'seoul',
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
        gender: res.gender,
        price: res.price,
        openUrl: res.openUrl,
        intro: res.intro,
        location: res.location,
        registDate: res.registDate
      }]
    });
  });

  app.delete('/room/requester-room/:memberId', function(req, res) {
    res.json({
      statusCode: '200',
      statusMsg: 'success'
    });
  })

}


function castReq(req) {

  var temp = {};
  temp = JSON.stringify(req['body']);
  var result = {
    body: ''
  };
  result.body = JSON.parse(temp.replace(/\:\"(\d+)\"([,\}])/g, '\:$1$2'));
  return result;
}