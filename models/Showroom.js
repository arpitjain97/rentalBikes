const mongoose = require('mongoose');
const ShowroomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please add a name'],
        unique:true,
        trim:true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    brand:{
        type: String,
        required: [true,'Please add a brand'],
        trim:true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL with HTTP or HTTPS'
        ]
      },
      phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      address: {
        type: String,
        required: [true, 'Please add an address']
      },
      createdAt:{
        type: Date,
        default: Date.now
      }
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
ShowroomSchema.virtual('bikes',{
  ref:'Bike',
  localField:'_id',
  foreignField:'showroom',
  justOne:false
})
module.exports = mongoose.model('Showroom',ShowroomSchema);