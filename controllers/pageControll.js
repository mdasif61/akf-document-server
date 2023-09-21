const PageData = require("../models/pageModels");

const fullPageWithData=async(req,res)=>{
    const {month,account,year,member}=req.body;
    const pages=await PageData.create({
        month,account,year,member
    });
    if(pages){
        res.status(201).send(pages)
    }else{
        return res.status(404).send({message:'page not found'})
    }
};

module.exports={
    fullPageWithData
}