import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [viewTickets, setViewTickets] = useState([]);

  const [theme, setTheme] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem('theme'));
    return saved ?? false; // false = light, true = dark
  });

  const controls = useAnimation();

  const fetchTicketsFromS3 = async () => {
    console.log("[FETCH] Requesting tickets from S3 via /api/fetch...");
    const res = await axios.get("http://localhost:5000/api/fetch");
    return res.data; 
  };

  const uploadTicketsToSQS = async () => {
    console.log("[UPLOAD] Uploading processed tickets to SQS via /api/uploadSQS...");
    const res = await axios.get("http://localhost:5000/api/uploadSQS");
    console.log("[UPLOAD] SQS upload complete:", res.data);
    return res.data;
  };

  const consumeTicketsToDynamoDB = async () => {
    console.log("[CONSUME] Consuming tickets from SQS → DynamoDB via /api/consumeTickets...");
    const res = await axios.get("http://localhost:5000/api/consumeTickets");
    console.log(`[CONSUME] DynamoDB write complete. `);
    return res.data;
  };

useEffect(() => {
  const runPipeline = async () => {
    try {
      console.log("[INIT] Starting ticket pipeline...");

      // Step 1: fetch
      const fetchRes = await fetchTicketsFromS3();

      // Step 2: upload
      const uploadRes = await uploadTicketsToSQS();

      // Step 3: consume
      const consumeRes = await consumeTicketsToDynamoDB();

      console.log("[SUCCESS] Pipeline finished successfully!");
      setViewTickets(fetchRes.data.tickets);

    } catch (err) {
      console.error("[ERROR] Pipeline failed:", err.message);
    }
  };

  runPipeline();
}, []);

  useEffect(() => {
    // start background animation loop
    const loopAnimation = async () => {
      while (true) {
        await controls.start({
          backgroundPosition: ['0% 50%', '100% 50%'],
          transition: { duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
        });
      }
    };
    loopAnimation();
  }, [controls]);

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Theme classes
  const containerClass = theme
    ? 'min-h-screen text-gray-100 relative overflow-hidden'
    : 'min-h-screen text-gray-900 relative overflow-hidden';

  const cardClass = theme
    ? 'bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1'
    : 'bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1';

  const titleClass = theme
    ? 'text-3xl font-bold text-white'
    : 'text-3xl font-bold text-gray-900';

  const ticketTitleClass = theme
    ? 'text-xl font-semibold mb-2 text-gray-100'
    : 'text-xl font-semibold mb-2 text-gray-900';

  const gradient = theme
    ? 'linear-gradient(270deg, #1e3a8a, #1e40af, #0f172a)'
    : 'linear-gradient(270deg, #a5b4fc, #c7d2fe, #e0e7ff)';

  return (
    <motion.div
      className={containerClass}
      animate={controls}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% 200%',
      }}
    >
      {/* Overlay for extra contrast */}
      <div className={`absolute inset-0 ${theme ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-sm`} />

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className={titleClass}>Tickets Dashboard</h1>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            View Detailed Analytics
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
          >
            Logout
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {viewTickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            viewTickets.map((ticket, index) => (
              <motion.div
                key={index}
                className={cardClass}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h2 className={ticketTitleClass}>{ticket.title}</h2>
                <p className="mb-1">
                  <strong>ID:</strong> {ticket.id}
                </p>
                <p className="mb-1">
                  <strong>Description:</strong> {ticket.description}
                </p>
                <p className="text-sm opacity-80">
                  <strong>Date:</strong> {ticket.date}
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
