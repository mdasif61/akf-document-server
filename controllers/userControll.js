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

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    console.log(user)
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            photo:user.photo,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ('invalid email or password')
    }
};

const getLoggedUser=async(req,res)=>{
    const {_id,name,email,photo}=req.user;
    res.json({
        _id,
        name,
        email,
        photo
    })
}

module.exports={
    registerUser,
    loginUser,
    getLoggedUser
}