const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail(email, otp) {
  try {
    const data = await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: [email],
      subject: 'Your OTP for Signing Up',
      html: `<p>Your OTP for Signing up in is <strong>${otp}</strong></p>`,
    });

    console.log('Email sent:', data);
    return 'Mail sent successfully';
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send email');
  }
}

async function sendQueryMail(email, userData) {
      try {
    const data = await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: [email],
      subject: 'New user query',
      html: `<p>A visitor with phone number ${userData.phone} has the following query, ${userData.message} <p>`,
    });

    console.log('Email sent:', data);
    return 'Mail sent successfully';
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send email');
  }

}

async function sendNotaryMail(email, formData ) {
  try {
    const data = await resend.emails.send({
  from: `onboarding@resend.dev`,
  to: [email],
  subject: 'Notary User Complete Submission Details',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">      
      <h3 style="color: #2563eb; margin-top: 2rem;">Your Submission Details</h3>
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
        <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace;">
${JSON.stringify({
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  preferred_method: formData.preferred_method,
  license_info: {
    number: formData.license_number,
    state: formData.state,
    expiration_date: formData.expiration_date
  },
  services: [
    ...formData.services_offered,
    ...(formData.other_service ? [`Other: ${formData.other_service}`] : [])
  ],
  business_info: {
    name: formData.business_name,
    address: formData.business_address,
    website: formData.website_url,
    years_in_business: formData.years_in_business
  }
}, null, 2)}
        </pre>
      </div>
      
      <p style="margin-top: 2rem;">If you didn't request this signup, please ignore this email.</p>
    </div>
  `,
});


    console.log('Email sent:', data);
    return 'Mail sent successfully';
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send email');
  }
}

module.exports = {sendMail, sendQueryMail, sendNotaryMail};
