var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var memberSchema = mongoose.Schema({
    kakaoId : {type:String, required:true, unique:true},
    nickName : {type:String, required:true},
    thumbnailImage : {type:String, required:true},
    ageRange : {type:String, required:true},
    gender : {type:String, required:true},
});

memberSchema.statics.insertMember = async function(req,res) {
	var mId = await this.findMemberId(req.body.kakaoId);

	if (mId != null) {
		console.log('kakaoid exists not INSERT : ' + mId);
		res.json ({
			statusCode: '200',
			statusMsg: 'success',
			total: '1',
			memberId: mId
		});
	} else {
		console.log('kakaoid not exists. Insert');
		memberObj = new this({
			kakaoId:req.body.kakaoId,
			nickName:req.body.nickName,
			thumbnailImage:req.body.thumbnailImage,
			ageRange:req.body.ageRange,
			gender:req.body.gender
		});
		var result = await memberObj.save(function(err, savedObj) {
			if (err) {
				console.log('insertMember1 error' + err);
				res.json ({
					statusCode: '500',
					statusMsg: err,
					total: '0'
				});
			} else if (!savedObj) {
				console.log('insertMember2 error' + err);
				res.json ({
					statusCode: '200',
					statusMsg: 'error',
					total: '0',
				});

			} else {
				res.json ({
					statusCode: '200',
					statusMsg: 'success',
					total: '1',
					memberId: savedObj._id
				});
				console.log('Save obj : ' + savedObj);
			}
		})
	}
}

memberSchema.statics.findMemberId = async function(kakaoId) {
  var obj = await this.findOne ({"kakaoId": kakaoId},
			function(err, obj) {
				 if (err) {
					 console.log('findMember err : ' + err);
				 } else if (!obj) {
					 console.log('member is not found');
				 }
			});

  if(obj == null)
		return null;
	return obj._id;
}

memberSchema.statics.findMember = async function(req,res){
  console.log('find... Member Id : ' + req.params.kakaoId);
  var member = await this.findOne(
		{'kakaoId':req.params.kakaoId}, function(err, data) { 
        if (err) {
          console.log('getMember err : ' + err);
          res.json({
            statusCode: '500',
            statusMsg: err,
            total: '0'
          });
        } else if (!data) {
          res.json({
            statusCode: '200',
            statusMsg: 'member not found',
            total: '0'
          });
        } else {
          console.log('room found success : ' + data);
          res.json({
            statusCode: '200',
            statusMsg: 'success',
            total: '1',
            resultItems:data
          });
        }
	});
}

memberSchema.statics.updateMember = async function(req, res) {
  console.log("updateMember kakaoId : " + req.params.kakaoId);
  await this.findOneAndUpdate(
      {kakaoId : req.params.kakaoId},
      {$set : 
        {
          nickName : req.body.nickName,
          thumbnailImage: req.body.thumbnailImage,
          ageRange: req.body.ageRange,
          gender: req.body.gender,
        }
      },
      function (err, obj) {
        if (err) {
          console.log('updateMember error' + err);
          res.json ({
            statusCode: '500',
            statusMsg: err,
            total: '0'
          });
        } else if (!obj) {
          console.log('updateMember error' + err);
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
          console.log('update obj : ' + obj);
        }
      });
}

/* delete Member */
memberSchema.statics.deleteMember = async function(req, res) {
  console.log("deleteMember : " + req.params.kakaoId);
  var member = await this.findOneAndDelete(
      {'kakaoId': req.params.kakaoId},
      function (err, obj) {
        if (err) {
          console.log('delete error' + err);
          res.json ({
            statusCode: '500',
            statusMsg: err,
            total: '0'
          });
        } else if (!obj) {
          console.log('delete error' + err);
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

module.exports = mongoose.model('members', memberSchema);
