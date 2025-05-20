const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
    },
    tokens: {
        type: Object,
        required: false,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    points:{
        type: Number,
        required: true,
        default: 10,
    },
    lastStreakAwarded: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('User', userSchema);