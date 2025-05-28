const { Resend } = require('resend');const resend = new Resend(process.env.RESEND_API_KEY);

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
module.exports = {sendMail, sendQueryMail};
