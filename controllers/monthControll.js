const PageData = require("../models/pageModels");

const monthRemoveRow=async(req,res)=>{
    const id=req.params.id;
    try {
        const monthAccount=await PageData.deleteOne({_id:id});
        res.status(200).json(monthAccount)
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
}

module.exports={
    monthRemoveRow
}