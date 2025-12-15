import React from 'react';
import Board from '../components/Board';
import Ring from '../components/Ring';
import Profile from './Profile';

const Analytics = () => {
  return (
    <div style={{ padding: "20px 40px", maxWidth: "1200px", margin: "auto" }}>
      
      {/* Hero / Title Section */}
      <div style={{
        textAlign: "center",
        background: "rgba(255,255,255,0.6)",
        padding: "30px 20px",
        borderRadius: "12px",
        marginBottom: "30px",
        position: "relative",
        overflow: "hidden"
      }}>
        <h1 className="brand" style={{ margin: 0, fontSize: "3rem" }}>RoutineQuest</h1>
        <h3 style={{ marginTop: "8px", fontSize: "1.5rem" }}>
          Slay Procrastination like a Boss!!
        </h3>
      </div>

      {/* Dashboard Heading */}
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem" }}>
        Your Analytics Dashboard 📊
      </h1>

      {/* Grid Layout: Profile | Progress Ring */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        marginBottom: "40px",
      }}>
        <div style={{ flex: "1 1 300px", minWidth: "280px", maxWidth: "400px" }}>
          <Profile />
        </div>
        <div style={{ flex: "1 1 300px", minWidth: "280px", maxWidth: "400px" }}>
          <Ring />
        </div>
      </div>

      {/* Leaderboard Section */}
      <div style={{
        background: "rgba(240,240,240,0.8)",
        padding: "20px",
        borderRadius: "12px",
      }}>
        <Board />
      </div>
    </div>
  );
};

export default Analytics;
