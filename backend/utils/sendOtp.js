const twilio = require('twilio');

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSID, authToken);

const sendPhoneOtp = async (phoneNumber,otp) => {
    try {
        const cleanedPhone = phoneNumber;
        console.log(cleanedPhone)
        await client.messages.create({
            body:`Your otp is ${otp}`,
            to:cleanedPhone,
            from:process.env.TWILIO_PHONE_NUMBER
        });

        console.log('otp sent')

    }
    catch(err) {
        console.log(err.message);
        if(err.code === 21211) throw new Error("Invalid phone number");
        throw new Error("Error occured while sending otp"); 
    }
}

module.exports = sendPhoneOtp;