const User = require('../models/User');

exports.register = async (req,res,next) => {
    try {
        await User.create(req.body)
        res.status(200).send({success:true,data:user});
    } catch (error) {
        res.status(400).send(error);
    }
}