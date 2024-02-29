import React from 'react';
import { useRecoilState } from 'recoil';
import { habitListState } from './atoms';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

const App = () => {
  const [habits, setHabits] = useRecoilState(habitListState);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      completed: false,
      history: {},
    };
    // Initialize habit history with 'none' status for each day
    const today = new Date().toISOString().split('T')[0];
    const lastSevenDays = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    lastSevenDays.forEach(day => {
      newHabit.history[day] = 'none';
    });
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const toggleHabit = (id, date) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const updatedHistory = { ...habit.history, [date]: getNextStatus(habit.history[date]) };
          return { ...habit, history: updatedHistory };
        }
        return habit;
      })
    );
  };
  
  

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'none':
        return 'done';
      case 'done':
        return 'notDone';
      case 'notDone':
        return 'none';
      default:
        return 'none';
    }
  };

  return (
    <div className="container">
      <h1>Habit Tracker</h1>
      <HabitForm onSubmit={addHabit} />
      <HabitList habits={habits} onDelete={deleteHabit} onToggle={toggleHabit} />
    </div>
  );
};

export default App;
