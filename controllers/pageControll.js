const PageData = require("../models/pageModels");

const fullPageWithData = async (req, res) => {
    const { month, account, year, member } = req.body;
    const pages = await PageData.create({
        month, account, year, member
    });
    if (pages) {
        res.status(201).send(pages)
    } else {
        return res.status(404).send({ message: 'page not found' })
    }
};

const allPages = async (req, res) => {
    try {
        const id=req.params.id;
        let pages;
        if(!id){
            pages=await PageData.find({})
        }else{
            pages=await PageData.findOne({_id:id})
        }
        if(!pages){
            res.status(404).json({message:'page not found'})
        }
        res.status(200).json(pages)
    } catch (error) {
        console.log('Error: ',error);
        res.status(500).json({message:'Internal server error'})
    }

}

module.exports = {
    fullPageWithData,
    allPages
}