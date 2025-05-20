import React from 'react';
import HabitItem from './HabitItem';  // Importing HabitItem to display individual habit

const HabitList = ({ habits, refreshHabits }) => {
  console.log('Habits in HabitList:', habits);  // Log the habits prop

  if (!habits || habits.length === 0) {
    return <p>No habits found. Start adding some!</p>;
  }

  return (
    <div>
      {habits.map((habit) => (
        <HabitItem 
          key={habit._id} 
          habit={habit} 
          onUpdate={refreshHabits}  // Refresh habit list after update
          onDelete={refreshHabits}  // Refresh habit list after deletion
        />
      ))}
    </div>
  );
};

export default HabitList;
