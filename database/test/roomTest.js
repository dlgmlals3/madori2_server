var insertTestObject1 = {
  body: {
    title: 'insertTestObject',
    ageMin: 1,
    ageMax: 1,
    date: 1,
    gender: 1,
    price: 1,
    openUrl: 'insertTestObject',
    intro: 'insertTestObject'
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

var testDB = async function() {
  var mongoose = require('mongoose');
  var async = require('async');
  var mongooseApi = require('../mongooseApi');
  var RoomModel = require('../schema/room');

  var dbName = process.argv[2] || 'locals';
  var dbPort = process.argv[2] || 27017;

  console.log("Usage node roomTest [DatabaseName] [DatabasePort]");
  console.log("Current DatbaseName : " + dbName + ", DatabasePort : " + dbPort);

  try {
    let result;

    console.log("1.  connect db");
    var db = await mongooseApi.connectDB(dbName, dbPort);
    result = await RoomModel.deleteAllRoom();

    console.log("\n\n2.  insert room insertObject 1, 2");
    result = await RoomModel.insertRoom(insertTestObject1, responseObject);
    result = await RoomModel.insertRoom(insertTestObject2, responseObject);
    resultList = await RoomModel.getRoomList();
    console.log("result : ", resultList)


    console.log("\n\n3.  delete room object 1");
    result = await RoomModel.deleteRoom(deleteTestObject1);
    resultList = await RoomModel.getRoomList();
    console.log("result : ", resultList)


    console.log("\n\n4.  find room object 2");
    result = await RoomModel.getRoomElement(findTestObject2, responseObject);
    console.log("result : ", responseObject)


    console.log("\n\n5.  update room insertObject2 >> updateObject");
    result = await RoomModel.updateRoom(updateTestObject3, responseObject);
    resultList = await RoomModel.getRoomList();
    console.log("result : ", resultList);


    console.log("\n\n6.  delete All room");
    result = await RoomModel.deleteAllRoom();
    resultList = await RoomModel.getRoomList();
    console.log("result : ", resultList)


    console.log("\n\n7.  diconnect db");
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
