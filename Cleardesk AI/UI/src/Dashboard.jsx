import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">HIII FROM DB</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
