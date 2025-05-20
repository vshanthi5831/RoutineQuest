const Habit = require('../models/Habit');
const updatePoints = require('../features/streakInc');
const User = require('../models/User');

// Create habit
const createHabit = async (req, res) => {
    const { name, description, frequency } = req.body;
    const userId = req.userId;  // Get userId from the request (from the middleware)

    try {
        const newHabit = new Habit({
            name,
            description,
            frequency,
            user: userId,  // Link the habit to the user
        });

        await newHabit.save();
        res.status(201).json({ message: 'Habit created successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId }); // Fetch habits linked to the logged-in user
    if (!habits) {
      return res.status(404).json({ message: 'No habits found' });
    }
    res.json(habits); // Return the habits as JSON
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateHabits = async (req, res) => {
    const { habitId } = req.params;
    const { completed } = req.body;

    try {
        const habit = await Habit.findOne({ _id: habitId, user: req.userId });

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // Only update if not already completed
        if (!habit.completed) {
            habit.completed = true;
            await habit.save();

            // Award points based on frequency
            const result = await updatePoints(req.userId, habit.frequency); // frequency = daily/weekly/monthly
            console.log('Points update result:', result);
        }

        res.json({ message: 'Habit updated successfully', habit });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const deleteHabits = async(req, res) => {
    const { habitId } = req.params; 
    
    try {
        const habit = await Habit.findOneAndDelete({ _id: habitId, user: req.userId});

        if(!habit){
            return res.status(404).json({message: 'Habit not found' });
        }

        res.json({message: 'Habit deleted successfully'});
    }
    catch (error){
        console.log('Error in deleting the habit');
        res.status(500).json({message: 'Server Error'});
    }
};

const getFilteredHabits = async (req, res) => {
  try {
    const { status, frequency, startDate, endDate, sortBy } = req.query; // Get filters from query parameters

    // Build the query object dynamically
    let query = { user: req.userId }; // Filter by logged-in user

    // Filter by 'status' (done or pending)
    if (status) {
      if (status === 'done') {
        query.completed = true;  // Filter for completed habits
      } else if (status === 'pending') {
        query.completed = false; // Filter for pending habits
      }
    }

    // Filter by 'frequency' (daily, weekly, etc.)
    if (frequency) {
      query.frequency = frequency; // Filter by frequency (daily, weekly, etc.)
    }

    // Filter by 'date of creation' (created within a specific date range)
    if (startDate || endDate) {
      query.createdAt = {}; // Assuming `createdAt` is the field for the date of creation
      if (startDate) query.createdAt.$gte = new Date(startDate); // Greater than or equal to start date
      if (endDate) query.createdAt.$lte = new Date(endDate); // Less than or equal to end date
    }

    // Fetch habits from the database based on the query filters
    let habits = await Habit.find(query);

    // Sort habits lexicographically by name if requested
    if (sortBy === 'name') {
      habits = habits.sort((a, b) => a.name.localeCompare(b.name)); // Lexicographical sorting by name
    }

    // If no habits found
    if (habits.length === 0) {
      return res.status(404).json({ message: 'No habits found' });
    }

    res.json(habits); // Return the filtered and sorted habits
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { createHabit, getHabits, updateHabits, deleteHabits, getFilteredHabits};
