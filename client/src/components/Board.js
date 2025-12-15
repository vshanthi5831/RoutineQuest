import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMedal } from 'react-icons/fa';

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

  const getMedalColor = (index) => {
    if (index === 0) return '#FFD700'; // Gold
    if (index === 1) return '#C0C0C0'; // Silver
    if (index === 2) return '#CD7F32'; // Bronze
    return '#fff'; // Default background
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>🏆 Leaderboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
      }}>
        {leaderboard.map((user, index) => (
          <div key={index} style={{
            flex: '0 0 200px',
            background: getMedalColor(index),
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {index < 3 && <FaMedal style={{ marginRight: '6px' }} />}
              {user.username}
            </div>
            <p style={{ margin: 0, fontSize: '1rem' }}>{user.points} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
