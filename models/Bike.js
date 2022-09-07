const mongoose = require('mongoose');
const BikeSchema = new mongoose.Schema({
    brand:{
        type: String,
        required: [true,'Please add a brand'],
        trim:true,
        maxlength: [50, 'Brand can not be more than 50 characters']
    },
    model:{
        type: String,
        required: [true,'Please add a model'],
        trim:true,
        maxlength: [50, 'Model can not be more than 50 characters']
    },
    showroom:{
        type: mongoose.Schema.ObjectId,
        ref:'Showroom',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Bike',BikeSchema);