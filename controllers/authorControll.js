const getAuthor=async(req,res)=>{
    const user=req.user;
    if(!user.role==='author'){
        res.send({author:false})
    }
    const result={author:user?.role==='author'};
    res.send(result)
}

module.exports={
    getAuthor
}