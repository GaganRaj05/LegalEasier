const IntakeForm = require('../models/Intake');
const Redis = require('ioredis');
const { sendEmailToNewUser, sendNewUserAlert } = require('./sendLead');
const redis = new Redis(process.env.REDIS_URL);

const storeIntake = async(userId) => {
    try {
        const sessionKey = `session:${userId}`;
        const intakeDocs = await redis.get(sessionKey);

        if(!intakeDocs) {
            console.log('No intake info found');
            return;
        }
        const parsedData = JSON.parse(intakeDocs);
        const intakeDoc = new IntakeForm({
            user_id:userId,
            name:parsedData.data.name,
            phone:parsedData.data.phone,
            email:parsedData.data.email,
            address:parsedData.data.address,
            user_role:parsedData.data.legal_issue,
            legal_issue:parsedData.data.legal_issue,
            path:parsedData.path,
            doc_url:parsedData.data.uploadedDocs
        });
        const userData = {
            name:parsedData.data.name,
            email:parsedData.data.email,
            phone:parsedData.data.phone,
            address:parsedData.data.address,
            legal_issue:parsedData.data.legal_issue,
            issue_type:parsedData.path,
            document:parsedData.uploadedDocs,

        }
        await intakeDoc.save();
        await sendEmailToNewUser(parsedData.data.email, parsedData.data.name);
        await sendNewUserAlert(userData)
        console.log('Lead saved succesfully');
    }
    catch(err) {
        console.log(err.message);
    }
}
module.exports = storeIntake;