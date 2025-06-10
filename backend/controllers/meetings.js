const {Resend} = require('resend')
const resend = new Resend(process.env.RESEND_API_KEY);
const Meeting = require('../models/Meetings');

const scheduleMeetings = async (req, res) => {
    try {
        const {name, email, phone, date, time, message} = req.body;

        await Meeting.create({
            name,
            email,
            phone, 
            date, 
            time,
            message
        })

        await resend.emails.send({
            from:`contact@legaleasier.org`,
            to:'rob@legaleasier.org',
            subject:`New meeting request`,
            html:`
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #2563eb;">A user has requested a meeting</h2>
          
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="font-weight: bold; padding: 6px 0;">Phone Number:</td>
              <td>${phone}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 6px 0;">Message:</td>
              <td style="white-space: pre-wrap;">${message}</td>
            </tr>
             <tr>
              <td style="font-weight: bold; padding: 6px 0;">Date:</td>
              <td style="white-space: pre-wrap;">${date}</td>
            </tr>
             <tr>
              <td style="font-weight: bold; padding: 6px 0;">Time:</td>
              <td style="white-space: pre-wrap;">${time}</td>
            </tr>
          </table>

          <p style="margin-top: 30px; color: #6b7280;">This message was submitted via the LegalEasier website.</p>
        </div>

            `
        })
        return res.status(201).json({success:true, msg:"Meeting scheduled successfully"});
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
}

module.exports = {scheduleMeetings};