const User = require('../models/User'); 

const getLeaderboard = async (req, res) => {
    try {
        const topUsers = await User.find({})
            .sort({ points: -1 }) 
            .limit(10)           
            .select('username points'); 

        res.status(200).json(topUsers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
};

module.exports = { getLeaderboard };
