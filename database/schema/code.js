var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var codeSchema = mongoose.Schema({
    codeId : {type:String, required:true, unique:true},
    parentCodeId : {type:String, required:true},
    codeName : {type:String, required:true},
    codeDescription : {type:String, required:true},
    registDate : {type:Date, default: Date.now, required:true},
    modifyDate : {type:Date, default: Date.now,  required:true},
});

codeSchema.statics.getCodeList = async function(req, res) {
  console.log('getCodeList order by rgistDate....');
  await this.find({}).sort({registDate: 'desc'}).exec(function(err, obj) {
    if (err) {
      console.log('getCodeList err : ' + err);
      res.json ({
        statusCode: '500',
        statusMsg: err,
        total: '0'
      });
    } else if (!obj) {
      console.log('code not found');
      res.json ({
        statusCode: '500',
        statusMsg: 'success',
        total: '0'
      });
    } else {
      res.json({
        statusCode: '200',
        statusMsg: 'success',
        total: obj.length,
        resultItems:obj 
      });
      console.log('obj : ' + obj);
      console.log('obj size : ' + obj.length);
    }
  });
}

module.exports = mongoose.model('codes', codeSchema);
