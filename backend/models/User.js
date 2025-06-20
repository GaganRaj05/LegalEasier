const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user_name: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    acceptedTerms: {
        type:Boolean,
        required:true,
    }
})

const User = mongoose.model("users", userSchema);

module.exports = User;