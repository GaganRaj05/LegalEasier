const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        require:true
    }
});

const Contact = mongoose.model('contacts',contactsSchema);

module.exports = Contact;