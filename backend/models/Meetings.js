const mongoose = require('mongoose');


const meetingsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        required:true
    },
    time: {
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
})

const Meeting = mongoose.model("meetings", meetingsSchema);

module.exports = Meeting;