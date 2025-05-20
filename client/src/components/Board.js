// routinequest/client/components/board.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/board/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Could not load leaderboard');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ol>
        {leaderboard.map((user, index) => (
          <li key={index}>
            <strong>{user.username}</strong> — {user.points} pts
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Board;
