var insertTestObject1= {
  body: {
    title: 'insertTestObjectPopulate',
    ageMin: 1,
    ageMax: 1,
    regDate: new Date('1990-02-20T15:00:00Z'),
		place:'1',
    gender: '1',
    price: 1,
    openUrl: 'insertTestObject',
    intro: 'insertTestObject',
		maxMemberNem:1,
//		registDate: '',
		memberId : 'heocules1'

  }
}
var insertTestObject2 = {
  body: {
    title: 'insertTestObject2',
    ageMin: 2,
    ageMax: 2,
    date: 2,
    gender: 2,
    price: 2,
    openUrl: 'insertTestObject2',
    intro: 'insertTestObject2'
  }
}

var deleteTestObject1 = {
  params: {
    roomId: 1
  }
}

var findTestObject2 = {
  params: {
    roomId: 2
  }
}

var updateTestObject3 = {
  params: {
    roomId: 2
  },
  body: {
    title: 'updatedTestObject3',
    ageMin: 3,
    ageMax: 3,
    date: 3,
    gender: 3,
    price: 3,
    openUrl: 'updatedTestObject3',
    intro: 'updatedTestObject3'
  }
}

var responseObject = {
  body: {
	title: '',
	ageMin: 0,
	ageMax: 0,
	date: 0,
	gender: 0,
	price: 0,
	openUrl: '',
	intro: ''
  }
}
var requestMemberId1 = {
  body: {
    memberId: 'heocules1'
  },
	params: {
    memberId: 'heocules1'
  }

}
var requestMemberId2 = {
  body: {
    memberId: 'heocules2'
  },
	params: {
    memberId: 'heocules2'
  }

}
var requestMemberId3 = {
  body: {
    memberId: 'heocules3'
  },
	params: {
    memberId: 'heocules3'
  }

}

var joinRoom1 = {

	body:{
		roomId : 20,
		memberId:'heocules2'
	}
}
var joinRoom2 = {

	body:{
		roomId : 20,
		memberId:'heocules3'
	}
}


var testDB = async function() {
  var mongoose = require('mongoose');
  var async = require('async');
  var mongooseApi = require('../mongooseApi');
  var MemberModel = require('../schema/memberSchema');
  var RoomModel = require('../schema/room1');

  var dbName = process.argv[2] || 'heocules2';
  var dbPort = process.argv[2] || 27017;

  console.log("Usage node roomTest [DatabaseName] [DatabasePort]");
  console.log("Current DatbaseName : " + dbName + ", DatabasePort : " + dbPort);

  try {
    let result;

    console.log('1.  connect db');
    var db = await mongooseApi.connectDB(dbName, dbPort);
/*
		console.log('2. member insert');
		result = await MemberModel.insertMember(requestMemberId1);
    result = await MemberModel.insertMember(requestMemberId2);
    result = await MemberModel.insertMember(requestMemberId3);
*/

 		//console.log("3. create member find");

		console.log('3. create room');
		var resultMemId = await MemberModel.findMemberId(insertTestObject1);
		insertTestObject1.body.createrId = resultMemId;
    result = await RoomModel.insertRoom(insertTestObject1, responseObject);
/*
		console.log('2. join room1');
	  var resultMemId2 = await MemberModel.findMemberId(joinRoom1);
		joinRoom1.body.memberId = resultMemId2;
		console.log('adsfasdf'+resultMemId2);
		result = await RoomModel.joinRoom(joinRoom1);

		console.log('3. join room2');
	  var resultMemId2 = await MemberModel.findMemberId(joinRoom2);
		joinRoom2.body.memberId = resultMemId2;
		console.log('adsfasdf'+resultMemId2);
		result = await RoomModel.joinRoom(joinRoom2);

*/
		console.log('4.populate');
		result = await RoomModel.findOne({roomId : 20}).lean().populate('createrId');
		console.log(result);

    result = await mongooseApi.disConnectDB(db);

  } catch (err) {
    console.error(err);
  }
}

testDB();

/*
roomSchema.statics.getRoomElement = async function(req, res, callback) {
	  return await this.find({
	    title: title
	  }, callback);
	}
*/
