const mongoose = require('mongoose');


const intakeSchema = {
    user_id: {
        type:String,
        required:true,
    },
    name :{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    user_role : {
        type:String,
        required:true,
    },
    legal_issue: {
        type:String,
        required:true,
    },
    path: {
        type:String,
        required:true,
    },
    doc_url: {
        type:String,
    }
}

const IntakeForm = mongoose.model('intakeforms', intakeSchema);


module.exports = IntakeForm;