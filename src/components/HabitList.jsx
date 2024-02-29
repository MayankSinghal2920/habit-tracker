import React from 'react';
import Habit from './Habit';

const HabitList = ({ habits, onDelete, onToggle }) => {
  return (
    <div>
      {habits.map((habit) => (
        <Habit key={habit.id} habit={habit} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default HabitList;
