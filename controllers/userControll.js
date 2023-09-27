const User=require('../models/userModels');
const generateToken=require('../config/generateToken')

const registerUser=async(req,res)=>{
    const {name,email,password,photo}=req.body;
    if(!name,!email,!password){
        res.status(404)
        throw new Error('please fill the all feilds')
    }

    const userExists=await User.findOne({email});
    if(userExists){
        res.status(404)
        throw new Error('user already exists')
    };
    const user=await User.create({
        name,
        email,
        password,
        photo
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            photo:user.photo,
            token:generateToken(user._id)
        })
    }else{
        res.status(404)
        throw new Error('failed the create user')
    }
}

module.exports={
    registerUser
}