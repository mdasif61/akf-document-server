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

const updateMember=async(req,res)=>{
    const id=req.params.id;
    const filter={_id:id}
    const {data}=req.body;
    const updateData=Object.keys(data).join(',');
    try {
        const updateDoc={
            $set:{
                [updateData]:data[updateData]
            }
        };
        const result=await MemberData.updateOne(filter,updateDoc);
        res.send(result)
    } catch (error) {
        console.log(`Error updateing member : ${error}`)
        res.status(500).send('Internal server error')
    }
}

module.exports = { addMember, getMember,deleteMember,updateMember };