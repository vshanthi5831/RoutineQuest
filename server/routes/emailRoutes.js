const express = require('express');
const router = express.Router();  
const sendEmail = require('../controllers/emailController');

// Route to send email reminder
router.post('/remainder', async (req, res) => {
    const { email } = req.body;

    try {
        await sendEmail(email, 'Habit Reminder', 'Hey! Just a reminder to complete your habit today.');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error('Error in sending email:', err);
        res.status(500).json({ message: 'Email failed to send' });
    }
});

module.exports = router;
