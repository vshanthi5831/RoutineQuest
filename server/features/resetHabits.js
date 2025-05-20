const cron = require('node-cron');
const Habit = require('../models/Habit');

cron.schedule('0 0 * * *', async () => {
  console.log('Hi, this is working');
  console.log('⏰ Running daily habit reset job...');

  try {
    // Reset DAILY habits every day
    await Habit.updateMany({ frequency: 'daily' }, { completed: false });

    // For WEEKLY habits, reset every Monday (day 1)
    const today = new Date();
    const isMonday = today.getDay() === 1;
    if (isMonday) {
      await Habit.updateMany({ frequency: 'weekly' }, { completed: false });
    }

    // For MONTHLY habits, reset on 1st of every month
    const isFirstOfMonth = today.getDate() === 1;
    if (isFirstOfMonth) {
      await Habit.updateMany({ frequency: 'monthly' }, { completed: false });
    }

    console.log('✅ Habit reset completed.');
  } catch (error) {
    console.error('❌ Error resetting habits:', error);
  }
});
