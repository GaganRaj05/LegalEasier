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

module.exports = { sendEmailToUser, sendEmailToOwner };


