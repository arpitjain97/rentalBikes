const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please add a name'],
        unique:true,
        trim:true,
        maxlength: [50, 'Name can not be more than 50 characters']
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
    role: {
        type: String,
        enum: ['user', 'owner'],
        default: 'user',
      },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
      },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now
      }
});

UserSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();

});

UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  });
}
UserSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model('User',UserSchema);