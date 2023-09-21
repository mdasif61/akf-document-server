const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    member: { type: [String], required:true },
    month:{type:String,required:true},
    account:{type:String,required:true},
    year:{type:String,required:true}
});

const PageData=mongoose.model('pageData', pageSchema);
module.exports=PageData