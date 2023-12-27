const User = require("../models/userModels");

const verifyAdmin = async (req, res, next) => {
  const email = req.user.email;
  const user=await User.findOne({email:email});
  if(user?.role!=='admin'){
    return res.status(401).send({error:true,message:'forbidden access'})
  }
  next()
};

module.exports = verifyAdmin;
