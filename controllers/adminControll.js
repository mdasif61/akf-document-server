const User = require("../models/userModels");

const getAdmin = async (req, res) => {
  const user=req.user;
  if(!user?.role==='admin'){
    res.send({admin:false})
  }
  const result={admin:user?.role==='admin'};
  res.send(result)
};

const roleChangeAdmin=async(req,res)=>{
  const id=req.params.id;
  const {value}=req.body;
  try {
    const updateRole=await User.findByIdAndUpdate(id,{$set:{role:value}})
    if(!updateRole){
      return res.status(404).send({error:"User not found for update role"})
    }
    res.status(200).send(updateRole)
  } catch (error) {
    console.log(error);
    res.status(500).send({error:'Internal server error'})
  }
}

module.exports = {
  getAdmin,
  roleChangeAdmin
};
  