const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, businessName, ownerName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Hello ${ownerName},

Please verify your email to complete the registration process for your business ${businessName}.

If you didn't initiate this request, please ignore this email.

Best regards,
Unicliche Team`,
  };


  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email} for ${ownerName} of ${businessName}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

module.exports = sendVerificationEmail;