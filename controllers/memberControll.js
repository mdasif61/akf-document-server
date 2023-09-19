const MemberData = require("../models/memberModels");

const addMember = async (req, res) => {
    const { name, mobile, date, share, fee, ifound, penalty, total } = req.body;
    const member = await MemberData.create({
        name,
        mobile,
        date,
        share,
        fee,
        ifound,
        penalty,
        total
    })
    if(member){
        res.status(201).json({
            _id:member._id,
        })
    }
};

const getMember=async(req,res)=>{
    const member=await MemberData.find({});
    if(!member){
        return res.status(404).json({message:'Member not found'})
    };
    res.status(200).json(member)
}

const deleteMember=async(req,res)=>{
    const id=req.params.id;
    const member=await MemberData.deleteOne({_id:id})
    res.json(member)
}

module.exports = { addMember, getMember,deleteMember };