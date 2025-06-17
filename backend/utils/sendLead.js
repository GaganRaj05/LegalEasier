const resend_api_key = process.env.RESEND_API_KEY;
const {Resend} = require('resend');
const resend = new Resend(resend_api_key);

const sendEmailToUser = async (lead) => {
  await resend.emails.send({
    from: 'contact@legaleasier.org',
    to: lead.email,
    subject: 'Regarding your recent visit',
    html: `        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2b2b2b;">Hi there!</h2>
          <p>We noticed you recently visited our site regarding the issue:</p>
          <blockquote style="font-style: italic; color: #555;">"${lead.query || 'your legal issue'}"</blockquote>
          <p>We're here to help. You can schedule a <strong>free consultation</strong> with our legal experts by clicking the button below:</p>
          <a href="https://legaleasier.org/schedule" style="
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            margin-top: 15px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          ">Schedule Now</a>
          <p style="margin-top: 30px;">Sincerely,<br>The LegalEasier Team</p>
        </div>
`
  });
};

const sendEmailToOwner = async (lead) => {
  await resend.emails.send({
    from: 'contact@legaleasier.org',
    to: 'rob@legaleasier.org',
    subject: 'New Lead Captured',
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>🚨 New Lead Captured</h3>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Query:</strong> ${lead.query || 'N/A'}</p>
          <p><strong>Lead ID:</strong> ${lead._id}</p>
          <p><strong>Lead Phone:</strong> ${lead.phone}</p>

          <p><strong>Last Activity At:</strong> ${new Date(lead.lastActivityAt).toLocaleString()}</p>
          <p><strong>Urgency:</strong> ${lead.lead_urgency || 'Not set yet'}</p>
          <p><strong>Status:</strong> ${lead.inactive ? 'Inactive' : 'Active'}</p>
        </div>`
  });
};


const sendEmailToNewUser = async (email, userName) => {
  try {
    await resend.emails.send({
      from: 'contact@legaleasier.org',
      to: email,
      subject: 'Welcome to LegalEasier — We’ve Received Your Intake',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0044cc;">Hi${userName ? ' ' + userName : ''},</h2>
          <p>Thank you for getting started with <strong>LegalEasier</strong>.</p>
          <p>We’ve received your information and one of our legal intake specialists will review it shortly.</p>
          <p>If any additional information is needed, we'll reach out to you directly at this email address.</p>
          <p>In the meantime, feel free to reply to this email if you have any questions or updates.</p>
          <br />
          <p>Best regards,</p>
          <p><strong>The LegalEasier Team</strong></p>
          <hr />
          <small style="color: #888;">This is an automated message. For urgent matters, contact us at support@legaleasier.org</small>
        </div>
      `,
    });
    console.log('Email sent to new user successfully');
  } catch (err) {
    console.log(err.message);
  }
};

const sendNewUserAlert = async (userData) => {
  try {
    const { name, email, phone, address, legal_issue, issue_type, document } = userData;

    await resend.emails.send({
      from: 'contact@legaleasier.org',
      to: 'rob@legaleasier.org',
      subject: '📥 New Legal Intake Submission Received',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0044cc;">New Intake Alert</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${address}</p>
          <p><strong>Legal Status:</strong> ${legal_issue}</p>
          <p><strong>Issue Type:</strong> ${issue_type}</p>
                    <p><strong>Uploaded Document:</strong> ${document}</p>

          <hr />
          <small style="color: #888;">This is an automated notification from LegalEasier Intake System</small>
        </div>
      `,
    });

    console.log('Intake notification sent to the owner successfully');
  } catch (err) {
    console.error('Error sending intake email to owner:', err.message);
  }
};


module.exports = { sendEmailToUser, sendEmailToOwner, sendEmailToNewUser, sendNewUserAlert };


