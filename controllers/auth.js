const User = require('../models/User');

exports.register = async (req,res,next) => {
    try {
        const user = await User.create(req.body);
        sendTokenResponse(user,200,res);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.login = async (req,res,next) => {
    const {email, password} = req.body;
    
    try {
        if(!email || !password){
            return res.status(400).json({success:false,data:{}});
        }

        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({success:false,data:{}});
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({success:false,data:{}});
        }
        sendTokenResponse(user,200,res);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getMe = async(req,res,next) =>{
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({success:false,data:{}});
        }
        res.status(200).json({success:true,data:user});
    } catch (error) {
        return res.status(400).json({success:false,data:{}});
    }
};

exports.logout = async (req,res,next) => {
    try {
        res.cookie('token','none',{
            expires: new Date(Date.now ()+ 10*1000),
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            data:{}
        })
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.updatePassword = async(req,res,next) =>{
    const user = await User.findById(req.user.id).select('+password');
    
    if(!(await user.matchPassword(req.body.currentPassword))){
        return next(new ErrorResponse('Password is incorrect',401));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user,200,res);
};

exports.updateDetails = async(req,res,next) =>{
    const fieldsToUpdate = {
        name: req.body.name,
        email:req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id,fieldsToUpdate,{
        new: true,
        runValidators:true
    });
    res.status(200).json({
        success:true,
        data:user
    })
};
const sendTokenResponse = (user,statusCode,res) => {
    const token = user.getSignedJwtToken();
    options = {
        expires : new Date( Date.now() + process.env.JWT_COOKIE_EXPIRE * 24*60*60*1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token',token,options).send({success:true,token});
}