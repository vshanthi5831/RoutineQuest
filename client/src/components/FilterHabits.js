import React, { useState } from 'react';

const FilterHabits = ({ habits, onFilter }) => {
  const [status, setStatus] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let filtered = [...habits];

    if (status) {
      filtered = filtered.filter(habit =>
        status === 'done' ? habit.completed : !habit.completed
      );
    }

    if (frequency) {
      filtered = filtered.filter(habit => habit.frequency === frequency);
    }

    if (startDate) {
      filtered = filtered.filter(habit =>
        new Date(habit.createdAt) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(habit =>
        new Date(habit.createdAt) <= new Date(endDate)
      );
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    onFilter(filtered);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Filter Habits</h3>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="done">Done</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div>
        <label>Frequency:</label>
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="">All</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>

      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterHabits;
