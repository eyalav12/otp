const mongoose=require('mongoose');
const validator=require('validator');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))throw new error('email is invalid');
        }
    },
    otp:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:'5m'
    }
});

const Otp= mongoose.model('Otp',otpSchema);
module.exports=Otp;