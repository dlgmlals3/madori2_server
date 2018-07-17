var DatabaseName = 'locals';
var DatabasePort = 27017

var insertRoomCallBack = function() {
	console.log('insertRoom');
}
var getRoomListCallBack = function() {
	console.log('getRoomListCallBack');
}

exports.testDB = function() {
  var mongoose = require('mongoose');
  var async = require('async');
  var mongooseApi = require('../mongooseApi');

  const roomObj = require('../schema/room');
  var res, err;

  async.series([
 	  function(callback) {
 	    setTimeout(function() {
 	      var db = mongooseApi.connectDB(DatabaseName, DatabasePort);
 	      callback(null, 'connectDB');
 	    }, 100);
 	  },

 	  function(callback) {
 	    setTimeout(function() {
 	      roomObj.insertRoom(insertTestObject, res);
 	      callback(null, 'insertRoom');
 	    }, 100);
 	  },

 	  function(callback) {
 	    setTimeout(function() {
 	      var resultList = roomObj.getRoomList(err);
 	      console.log('getRoomList result : ' + resultList);
 	    }, 300);
 	  }
 	])

}

/* Object for testing */
var insertTestObject = {
  body: {
    title: 'insertTestObject',
    ageMin: 1,
    ageMax: 1,
    date: 1,
    gender: 1,
    price: 1,
    openUrl: 'insertTestObject',
    intro: 'insertTestObject',
    explain: 'insertTestObject'
  }
}

var updateTestObject = {
  params: {
    roomId: 'hi'
  },
  body: {
    title: 'insertTestObject2',
    ageMin: 2,
    ageMax: 2,
    date: 2,
    gender: 2,
    price: 2,
    openUrl: 'insertTestObject2',
    explain: 'insertTestObject2'
  }
}