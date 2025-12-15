// src/pages/CreateHabit.js
import React, { useState } from 'react';
import confetti from "canvas-confetti";
import API from '../api';

const CreateHabit = ({ refreshHabits }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !frequency) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await API.post('/habits/createHabits', { name, description, frequency });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#430633", "#6b2d59"]
      });

      setName('');
      setDescription('');
      setFrequency('');
      setError('');
      refreshHabits();
    } catch (error) {
      setError('Failed to create habit');
    }
  };

  return (
    <div>
      <h3>Create New Habit</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="">Select Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        
        <br />
        <br />
        <br />

        <button type="submit">Create Habit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateHabit;


