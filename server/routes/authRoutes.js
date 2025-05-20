const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); 
const User = require('../models/User');  // Ensure the correct path to your User model

// Log to check if CLIENT_ID is available in authRoutes
console.log('CLIENT_ID in authRoutes:', process.env.CLIENT_ID);

// Setup OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,         // Client ID from Google Console
  process.env.CLIENT_SECRET,     // Client Secret from Google Console
  'http://localhost:5000/auth/callback'  // Redirect URI
);

async function refreshAccessToken() {
  const refreshToken = process.env.REFRESH_TOKEN;

  try {
    // Use the refresh token to obtain a new access token
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials); // Store the new credentials with the updated access token
    console.log('New Access Token:', credentials.access_token);
    return credentials.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

// Step 1: Route to initiate the OAuth2 authentication
router.get('/auth', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'openid'
        ]
    });


  res.redirect(authUrl);  // Redirect the user to Google's OAuth page
});

// Step 2: Callback route to handle the response after authentication
router.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    console.log('Authorization code is missing');
    return res.status(400).send('Missing authorization code');
  }

  try {
    console.log('Received authorization code:', code);
    // Step 1: Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens); // Set the received tokens for the oauth2 client
    console.log('Tokens received:', tokens);  // Log the tokens

    // Step 2: Get the user's info (optional)
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data: userInfo } = await oauth2.userinfo.get();
    console.log('User Info:', userInfo);  // Log user info

    // Step 3: Look for the user in the database
    let user = await User.findOne({ email: userInfo.email });
    console.log('User found in DB:', user);

    // If user doesn't exist, create a new user
    if (!user) {
      user = new User({
        username: userInfo.email.split('@')[0], // Use email before @ as username
        email: userInfo.email,
        password: 'temp-google-user', // Default password (set as temp)
      });
      console.log('New User created:', user);
    }

    // Step 4: Store the tokens in the user's record
    user.tokens = tokens;  // Store the received tokens
    console.log('Storing tokens for user:', user.username);

    // Step 5: Save the user record with the tokens
    await user.save();
    console.log('User saved with tokens:', user.username);

    // Step 6: Respond to the user (successful authentication)
    res.send('Authentication successful! Welcome ' + user.username);

  } catch (error) {
    console.error('OAuth Error:', error.response?.data || error.message);
    res.status(500).send('Authentication failed');
  }
});


module.exports = router;
