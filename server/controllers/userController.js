const bcrypt = require('bcryptjs')
const User = require('../models/User');
const jwt = require('jsonwebtoken'); 

const registerUser = async(req, res) =>{
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, 
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully! '});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token and send it back
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('username email points createdAt');

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.json(user);
    }
    catch (error){
        console.log(error);
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = { registerUser, loginUser, getUser };