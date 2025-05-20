const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const User = require('../models/User');

// Setup OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:5000/auth/callback' // Ensure your callback URI is correct
);

// Helper to check if access token is expired
function isAccessTokenExpired(expiryDate) {
  return Date.now() >= expiryDate;
}

// Refresh the access token
async function refreshAccessToken(refreshToken) {
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials;
}

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    console.log('Searching for user with email:', to);  // Debugging line to check the email being passed
    const user = await User.findOne({ email: to.trim() });  // Using trim to remove spaces
    console.log('User found:', user);  // Check if user is found
    if (!user) {
      console.error('User not found in database');  // Log if the user is not found
      throw new Error('User not found');
    }

    const tokens = user.tokens;
    if (!tokens || !tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
      throw new Error('No valid tokens found for user');
    }

    console.log('Tokens loaded from DB:', tokens);  // Debugging step

    // If token expired, refresh it
    let accessToken = tokens.access_token;
    if (isAccessTokenExpired(tokens.expiry_date)) {
      console.log('Access token expired, refreshing...');
      const newTokens = await refreshAccessToken(tokens.refresh_token);
      user.tokens = newTokens; // Update tokens in DB
      await user.save();
      accessToken = newTokens.access_token;
    }

    // Set up nodemailer with OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: tokens.refresh_token,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `RoutineQuest <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
  } catch (err) {
    console.error('❌ Error in sendEmail:', err.message);
    throw err;
  }
};


module.exports = sendEmail;
