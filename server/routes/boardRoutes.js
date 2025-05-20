const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../features/leaderBoard');

router.get('/leaderboard', getLeaderboard);

module.exports = router;
