const mongoose=require('mongoose');

const memberSchema=mongoose.Schema({
    name:{type:String},
    mobile:{type:Number},
    date:{type:String},
    share:{type:Number},
    ifound:{type:Number},
    fee:{type:Number},
    penalty:{type:Number},
    total:{type:Number},
    month:{type:String},
    account:{type:String},
    year:{type:String}
});

const MemberData=mongoose.model('memberData', memberSchema);

module.exports=MemberData;