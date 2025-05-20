const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/getUser', authMiddleware, getUser);

module.exports = router;