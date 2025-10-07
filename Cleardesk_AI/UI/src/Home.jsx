import React, { useState } from 'react';
import Form from './Form';
import LoginForm from './LoginForm';
import { motion } from 'framer-motion';

const Home = () => {
  const [theme, setTheme] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem('theme'));
    return saved ?? false; // false = light, true = dark
  });

  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleThemeClick = () => {
    const temp = !theme;
    sessionStorage.setItem('theme', JSON.stringify(temp));
    setTheme(temp);
  };

  const handleRegister = () => {
    setShowForm((prev) => !prev);
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin((prev) => !prev);
    setShowForm(false);
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden font-sans transition-colors duration-300 ${theme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
        }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Circle 1 */}
        <motion.div
          className="absolute w-72 h-72 rounded-full blur-3xl opacity-30"
          style={{
            background: theme
              ? 'radial-gradient(circle, #3b82f6, #9333ea)'
              : 'radial-gradient(circle, #60a5fa, #a855f7)',
          }}
          animate={{
            x: [0, 150, -150, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 9, // faster
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Circle 2 */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            top: '40%',
            left: '60%',
            background: theme
              ? 'radial-gradient(circle, #22d3ee, #3b82f6)'
              : 'radial-gradient(circle, #0ea5e9, #38bdf8)',
          }}
          animate={{
            x: [0, -200, 200, 0],
            y: [0, 150, -150, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Circle 3 */}
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{
            bottom: '10%',
            right: '20%',
            background: theme
              ? 'radial-gradient(circle, #ef4444, #f97316)'
              : 'radial-gradient(circle, #f59e0b, #ef4444)',
          }}
          animate={{
            x: [0, 200, -200, 0],
            y: [0, -120, 120, 0],
            scale: [1, 1.4, 0.7, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>


      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 shadow-md transition-colors duration-300">
        <h1 className="text-2xl font-bold">AI Ticket Classifier</h1>
        <div className="flex gap-4">
          <button
            onClick={handleRegister}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          >
            Sign-Up
          </button>
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          >
            Login
          </button>
          <button
            onClick={handleThemeClick}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          >
            {theme ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 min-h-[calc(100vh-96px)]">
        <div
          className={`w-full transition-all duration-300 ${showForm || showLogin ? 'filter blur-sm opacity-50 pointer-events-none' : ''
            }`}
        >
          <p className="text-center text-lg mb-6">
            Upload your tickets and let AI classify them automatically.
          </p>
        </div>

        {showForm && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <Form theme={theme} />
          </div>
        )}

        {showLogin && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <LoginForm theme={theme} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
