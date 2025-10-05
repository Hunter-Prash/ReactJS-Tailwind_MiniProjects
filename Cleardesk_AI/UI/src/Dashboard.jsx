import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [viewTickets, setViewTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let response = await axios.get('http://localhost:5000/api/fetch');
        setViewTickets(response.data.tickets);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchTickets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tickets Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {viewTickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          viewTickets.map((ticket, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
              <p className="text-gray-700 mb-1"><strong>ID:</strong> {ticket.id}</p>
              <p className="text-gray-700 mb-1"><strong>Description:</strong> {ticket.description}</p>
              <p className="text-gray-500 text-sm"><strong>Date:</strong> {ticket.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
