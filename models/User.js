const mongoose = require('mongoose');
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

module.exports = mongoose.model('User',UserSchema);