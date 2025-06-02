const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const contact_email = process.env.CONTACT_MAIL;
async function sendMail(email, otp) {
  try {
    const data = await resend.emails.send({
      from: `contact@legaleasier.org`,
      to: ['gaganraj.dev05@gmail.com','rob@legaleasier.org'],
      subject: "Your OTP for Signing Up",
      html: `<p>Your OTP for Signing up is <strong>${otp}</strong></p>`,
    });

    console.log("Email sent:", data);
    return "Mail sent successfully";
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send email");
  }
}

async function sendQueryMail(email, userData) {
  try {
    const data = await resend.emails.send({
      from: `contact@legaleasier.org`,
      to: [email],
      subject: "New User Query Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #2563eb;">New User Query</h2>
          
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="font-weight: bold; padding: 6px 0;">Phone Number:</td>
              <td>${userData.phone}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 6px 0;">Message:</td>
              <td style="white-space: pre-wrap;">${userData.message}</td>
            </tr>
          </table>

          <p style="margin-top: 30px; color: #6b7280;">This message was submitted via the LegalEasier website.</p>
        </div>
      `,
    });

    console.log("Email sent:", data);
    return "Mail sent successfully";
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send email");
  }
}

async function sendNotaryMail(email, formData) {
  try {
    const data = await resend.emails.send({
      from: contact_email,
      to: [email],
      subject: "Notary User Complete Submission Details",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px;">
        <h2 style="color: #2563eb;">Your Submission Details</h2>
        
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="font-weight: bold; padding: 6px 0;">Name:</td><td>${formData.name}</td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">Email:</td><td><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">Phone:</td><td>${formData.phone}</td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">Preferred Contact:</td><td>${formData.preferred_method.join(', ')}</td></tr>
        </table>

        <h3 style="margin-top: 30px; color: #111827;">License Information</h3>
        <table style="width: 100%; font-size: 14px;">
          <tr><td style="font-weight: bold; padding: 6px 0;">License Number:</td><td>${formData.license_number}</td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">State:</td><td>${formData.state}</td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">Expiration Date:</td><td>${formData.expiration_date}</td></tr>
        </table>

        <h3 style="margin-top: 30px; color: #111827;">Services Offered</h3>
        <ul style="padding-left: 20px;">
          ${formData.services_offered.map(service => `<li>${service}</li>`).join('')}
          ${formData.other_service ? `<li>Other: ${formData.other_service}</li>` : ''}
        </ul>

        <h3 style="margin-top: 30px; color: #111827;">Business Information</h3>
        <table style="width: 100%; font-size: 14px;">
          <tr><td style="font-weight: bold; padding: 6px 0;">Business Name:</td><td>${formData.business_name}</td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">Address:</td><td>${formData.business_address}</td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">Website:</td><td>${formData.website_url || '-'}</td></tr>
          <tr><td style="font-weight: bold; padding: 6px 0;">Years in Business:</td><td>${formData.years_in_business}</td></tr>
        </table>

        <p style="margin-top: 30px; color: #6b7280;">If you didn't request this signup, please ignore this email.</p>
      </div>
      `,
    });

    console.log("Email sent:", data);
    return "Mail sent successfully";
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send email");
  }
}


module.exports = { sendMail, sendQueryMail, sendNotaryMail };
