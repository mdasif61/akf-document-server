const mongoose=require('mongoose');

const memberSchema=mongoose.Schema({
    name:{type:String},
    mobile:{type:String},
    date:{type:String},
    share:{type:String},
    ifound:{type:String},
    fee:{type:String},
    penalty:{type:String},
    total:{type:String}
});

const MemberData=mongoose.model('memberData', memberSchema);

module.exports=MemberData;