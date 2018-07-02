var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    title : String,
    ageMin : Number,
    ageMax : Number,
    date : {type: Date, default: Date.now},
    sex : Number,
    price : Number,
    openUrl : String,
    explain : String  
});

module.exports = mongoose.model('room',roomSchema);