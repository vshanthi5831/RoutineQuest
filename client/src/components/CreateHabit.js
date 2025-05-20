// src/pages/CreateHabit.js
import React, { useState } from 'react';
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
      setName('');
      setDescription('');
      setFrequency('');
      refreshHabits();  // Refresh the habit list after creation
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
        <input
          type="text"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <button type="submit">Create Habit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateHabit;
