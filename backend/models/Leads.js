const mongoose = require('mongoose')

const leadsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    phone: {
        type:String,
        required:true
    },
    lead_source:{
        type:String,
        required:true,
    },
    messages: {
        type:[{
            user:String,
            ai:Object,
            timestamp: {type:Date,default:Date.now}
        }],
        default:[]
    },
    query: {
        type:String,
        required:true
    },
    inactive: {
        type:Boolean,
        default:false,
        index:true
    },
    lastActivityAt: {
        type:Date,
        default:Date.now
    },
    lead_urgency: {
        type:String,
        default:null
    }
}, {timestamps:true});


leadsSchema.index({inactive:1, lastActivityAt:1});
const Leads = mongoose.model('leads', leadsSchema);

module.exports = Leads;