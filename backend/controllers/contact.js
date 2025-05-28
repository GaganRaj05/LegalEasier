const Contact = require('../models/Contacts');
const {sendQueryMail} = require('../utils/email');

async function sendQuery(req, res) {
    try {
        const {email, name, message,phone} = req.body;
        await Contact.create({
            email,
            name, 
            message
        });

        await sendQueryMail('gaganraj.dev05@gmail.com',{email, name,phone, message});
        return res.status(200).json({success:true, msg:'mail sent successfully'});
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured please try again later"});
    }
}

module.exports = sendQuery;