const User = require('../models/User');

exports.getUsers = async (req,res,next) => {
    try {
        const users = await User.find();
        res.status(200).json({success:true,count:users.length,data:users});
    } catch (error) {
        res.status(400).json({success:false,data:{}});
    }
}

exports.getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({success:false,data:{}});
        }
        res.status(200).json({success:true,data:user});
    } catch (error) {
        res.status(400).json({success:false,data:{}});
    }
}

exports.createUser = async (req,res,next) => {
    let user = req.body;
    try {
        await User.create(user);
        res.status(200).send({success:true,data:user});
    } catch (error) {
        res.status(400).send(error); 
    }
}

exports.updateUser = async (req,res,next) => {
    try {
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({success:false,data:{}});
        }
        user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).send({success:true,data:user});
    } catch (error) {
        res.status(400).send(error); 
    }
}
exports.deleteUser = async (req,res,next) => {
    try {
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({success:false,data:{}});
        }
        user = await User.findByIdAndRemove(req.params.id);
        res.status(200).send({success:true,data:{}});
    } catch (error) {
        res.status(400).send(error); 
    }
}