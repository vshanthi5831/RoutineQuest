const express = require('express');
const { createHabit, getHabits, updateHabits, deleteHabits, getFilteredHabits } = require('../controllers/habitController');
const authMiddleware = require('../middleware/authMiddleware');  

const router = express.Router();

router.post('/createHabits', authMiddleware, createHabit);
router.get('/getHabits', authMiddleware, getHabits);
router.put('/updateHabits/:habitId', authMiddleware, updateHabits);
router.delete('/deleteHabits/:habitId', authMiddleware, deleteHabits)
router.get('/filterHabits', authMiddleware, getFilteredHabits);

module.exports = router;