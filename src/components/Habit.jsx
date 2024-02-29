import React from 'react';

const Habit = ({ habit, onDelete, onToggle }) => {
  const renderHistory = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastSevenDays = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      };
    });

    const doneDays = Object.values(habit.history).filter(status => status === 'done').length;
    const totalDays = lastSevenDays.length;
    const percentage = totalDays > 0 ? Math.round((doneDays / totalDays) * 100) : 0;

    return (
      <React.Fragment>
        <div className="progress-info">Completed: {doneDays} out of {totalDays} days ({percentage}%)</div>
        <div className="history">
          {lastSevenDays.reverse().map(({ date, day }) => {
            const entry = habit.history[date];
            return (
              <span
                key={date}
                className={`history-day ${entry}`}
                title={entry === 'done' ? 'Done' : entry === 'notDone' ? 'Not Done' : 'None'}
                onClick={() => onToggle(habit.id, date)}
              >
                <span className="day">{day}</span>
                <span className="date">{date}</span>
              </span>
            );
          })}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="habit">
      <h3>{habit.name}</h3>
      {renderHistory()}
      <button className="delete-button" onClick={() => onDelete(habit.id)}>Delete</button>
    </div>
  );
};

export default Habit;
