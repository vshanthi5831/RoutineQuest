import React, { useState } from 'react';
import API from '../api';

const emojis = ["🎉", "✨", "💪", "🍬", "🏆"]; 

const HabitItem = ({ habit, onUpdate, onDelete }) => {
  const [showEmojis, setShowEmojis] = useState(false);

  const handleCheckboxChange = async () => {
    try {
      await API.put(`/habits/updateHabits/${habit._id}`, { completed: true });
      onUpdate();

      setShowEmojis(true);
      setTimeout(() => setShowEmojis(false), 800);
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/habits/deleteHabits/${habit._id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <p><strong>Frequency:</strong> {habit.frequency}</p>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <label>
          <input
            type="checkbox"
            checked={habit.completed}
            onChange={handleCheckboxChange}
            disabled={habit.completed}
          />
          Mark as done
        </label>

        {showEmojis && (
          <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>
            {emojis.map((emoji, index) => {
              const offsetX = (index - Math.floor(emojis.length / 2)) * 25; // 25px gap between emojis
              return (
                <span
                  key={index}
                  style={{
                    position: 'absolute',
                    animation: `emoji-float 0.8s ease-out forwards`,
                    left: `${offsetX}px`,
                  }}
                >
                  {emoji}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <br /><br />
      <div>
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#430633",
            color: "#ffffff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>

      <style>
        {`
          @keyframes emoji-float {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            50% { opacity: 1; transform: translateY(-20px) scale(1.2); }
            100% { opacity: 0; transform: translateY(-50px) scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default HabitItem;
