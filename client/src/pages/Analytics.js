// routinequest/client/pages/analytics.jsx

import React from 'react';
import Board from '../components/Board';
import Ring from '../components/Ring';
import Profile from './Profile';

const Analytics = () => {
  return (
    <div>
      <h1>How's You</h1>
      <Profile />
      <Board />

      <h2>📊 Your Progress</h2>
      <Ring />
    </div>
  );
};

export default Analytics;
