const Bike = require('../models/Bike');
const Showroom = require('../models/Showroom');
exports.getBikes = async (req,res,next) => {
    let bikes = [];
    try {
    if (req.params.showroomId){
        const showroom = await Showroom.findById(req.params.showroomId);
        if (!showroom){
            return res.status(400).json({success:false,data:{}});
        }
        bikes = await Bike.find({showroom:req.params.showroomId});
    }
    else{
        bikes = await Bike.find().populate({path:'showroom', select: 'name brand'});
    }

    res.status(200).send({success:true,count:bikes.length,data:bikes});
    } catch (error) {
        res.status(400).send(error); 
    }
}
exports.getBike = async (req,res,next) => {
    try {
    const bike = await Bike.findById(req.params.id).populate({path:'showroom', select: 'name brand'});
    if(!bike){
        return res.status(400).json({success:false,data:{}});
    }
    res.status(200).send({success:true,data:bike});
    } catch (error) {
        res.status(400).send(error); 
    }
}
exports.createBike = async (req,res,next) => {
    let bike = req.body;
    
    try {
        if (req.params.showroomId){
            const showroom = await Showroom.findById(req.params.showroomId);
            if (!showroom){
                return res.status(400).json({success:false,data:{}});
            }
            bike.showroom = req.params.showroomId;
            console.log(bike)
            await Bike.create(bike);
        }
        else{
            return res.status(400).json({success:false,data:{}});
        }
    res.status(200).send({success:true,data:bike});
    } catch (error) {
        res.status(400).send(error); 
    }
}
exports.deleteBike = async (req,res,next) => {
    try {
    const bike = await Bike.findById(req.params.id);
    if(!bike){
        return res.status(400).json({success:false,data:{}});
    }
    await bike.remove();
    res.status(200).send({success:true,data:{}});
    } catch (error) {
        res.status(400).send(error); 
    }
}

exports.updateBike = async (req,res,next) => {
    
    try {
    let bike = await Bike.findById(req.params.id,req.body);
    
    if(!bike){
        return res.status(400).json({success:false,data:{}});
    }
    bike = await Bike.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    });
    res.status(200).send({success:true,data:bike});
    } catch (error) {
        console.error(error)
        res.status(400).send(error); 
    }
}