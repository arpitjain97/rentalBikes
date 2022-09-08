const Showroom = require('../models/Showroom');
exports.getShowrooms = async (req,res,next) => {
    try {
    const showrooms = await Showroom.find().populate('bikes');
    
    res.status(200).send({success:true,count:showrooms.length,data:showrooms});
    } catch (error) {
        res.status(400).send(error); 
    }
}
exports.getShowroom = async (req,res,next) => {
    try {
    const showroom = await Showroom.findById(req.params.id);
    if(!showroom){
        return res.status(400).json({success:false,data:{}});
    }
    res.status(200).send({success:true,data:showroom});
    } catch (error) {
        res.status(400).send(error); 
    }
}
exports.createShowroom = async (req,res,next) => {
    try {
        const showroom = req.body;
        await Showroom.create(showroom);
    res.status(200).send({success:true,data:showroom});
    } catch (error) {
        res.status(400).send(error); 
    }
}
exports.deleteShowroom = async (req,res,next) => {
    try {
    const showroom = await Showroom.findById(req.params.id);
    if(!showroom){
        return res.status(400).json({success:false,data:{}});
    }
    await showroom.remove();
    res.status(200).send({success:true,data:{}});
    } catch (error) {
        res.status(400).send(error); 
    }
}

exports.updateShowroom = async (req,res,next) => {
    
    try {
    let showroom = await Showroom.findById(req.params.id,req.body);
    
    if(!showroom){
        return res.status(400).json({success:false,data:{}});
    }
    showroom = await Showroom.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    });
    res.status(200).send({success:true,data:showroom});
    } catch (error) {
        console.error(error)
        res.status(400).send(error); 
    }
}