const User = require('../models/User');
const Habit = require('../models/Habit');

const POINTS = {
  daily: 100,
  weekly: 50,
  monthly: 25,
  streakBonus: 200,
};

const has21DayStreak = async (userId) => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 20); 
  
  const habits = await Habit.find({
    user: userId,
    frequency: 'daily',
    completed: true,
    updatedAt: { $gte: pastDate }, 
  });


  const completedDays = new Set(
    habits.map(habit => habit.updatedAt.toISOString().split('T')[0])
  );

  for (let i = 0; i < 21; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];

    if (!completedDays.has(dateStr)) {
      return false; 
    }
  }

  return true; 
};


const updatePoints = async (userId, frequency) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { success: false, message: 'User not found' };

    let pointsToAdd = POINTS[frequency.toLowerCase()] || 0;
    let streakAwarded = false;

    if (frequency === 'daily') {
      const isStreak = await has21DayStreak(userId);
      if (isStreak && !user.lastStreakAwarded) {
        pointsToAdd += POINTS.streakBonus;
        streakAwarded = true;
        user.lastStreakAwarded = new Date(); 
      }
    }

    user.points = (user.points || 0) + pointsToAdd;
    await user.save();

    return {
      success: true,
      points: user.points,
      streakAwarded,
      pointsGained: pointsToAdd,
    };
  } catch (err) {
    console.error('Error updating points:', err);
    return { success: false, message: 'Server error in updating points' };
  }
};

module.exports = updatePoints;
