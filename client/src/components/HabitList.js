import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits, refreshHabits }) => {
  if (!habits || habits.length === 0) {
    return <p>No habits found. Start adding some!</p>;
  }

  const getCardWidth = (total) => {
    if (total === 1) return "100%";
    if (total === 2) return "calc(50% - 8px)";
    return "calc(33.33% - 10.66px)";
  };

  const cardWidth = getCardWidth(habits.length);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {habits.map((habit) => (
        <div
          key={habit._id}
          className={habit.completed ? 'card-bounce' : ''}
          style={{
            flex: `0 0 ${cardWidth}`,
            background: "rgba(240, 240, 240, 0.8)",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            boxSizing: "border-box",
            transition: "transform 0.3s",
          }}
        >
          <HabitItem
            habit={habit}
            onUpdate={refreshHabits}
            onDelete={refreshHabits}
          />
        </div>
      ))}

      <style>
        {`
          @keyframes bounce {
            0% { transform: scale(1); }
            25% { transform: scale(1.05); }
            50% { transform: scale(0.95); }
            75% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          .card-bounce {
            animation: bounce 0.5s ease;
          }
        `}
      </style>
    </div>
  );
};

export default HabitList;
