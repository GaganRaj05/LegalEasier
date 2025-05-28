const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
    },
    otp: {
        type:String,
        default:null,
    }
})

const OTP = mongoose.model('otp',otpSchema);

module.exports = OTP;