import React from 'react';

const Dashboard = ({ delayedCount, upcomingCount, setView }) => {
  return (
    <div className="flex justify-around mb-6">
      <button
        className="w-48 h-20 bg-red-500 text-white text-xl font-bold rounded-lg"
        onClick={() => setView('delayed')}
      >
        {delayedCount} DELAYED
      </button>
      <button
        className="w-48 h-20 bg-green-500 text-white text-xl font-bold rounded-lg"
        onClick={() => setView('upcoming')}
      >
        {upcomingCount} UPCOMING
      </button>
    </div>
  );
};

export default Dashboard;
