// src/components/HabitItem.js
import React from 'react';
import API from '../api';

const HabitItem = ({ habit, onUpdate, onDelete }) => {
  const handleCheckboxChange = async () => {
    try {
      await API.put(`/habits/updateHabits/${habit._id}`, { completed: true });
      onUpdate();  // Refresh habit list after update
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/habits/deleteHabits/${habit._id}`);
      onDelete();  // Refresh habit list after delete
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div>
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
      <p><strong>Frequency:</strong> {habit.frequency}</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={habit.completed}
            onChange={handleCheckboxChange}
            disabled={habit.completed} // Disable if already completed
          />
          Mark as done
        </label>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default HabitItem;
