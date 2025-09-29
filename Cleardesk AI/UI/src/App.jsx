import React, { useState } from 'react';
import Form from './Form';

const App = () => {
  const [theme, setTheme] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem('theme'));
    return saved ?? false; // false = light, true = dark
  });

  const [showForm, setShowForm] = useState(false);

  const handleThemeClick = () => {
    const temp = !theme;
    sessionStorage.setItem('theme', JSON.stringify(temp));
    setTheme(temp);
  };

  const handleLoginClick = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme ? 'bg-gray-900 text-gray-100 dark' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-md transition-colors duration-300">
        <h1 className="text-2xl font-bold">AI Ticket Classifier</h1>
        <div className="flex gap-4">
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
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
      <main className="relative flex flex-col items-center justify-center mt-20 px-4 min-h-[calc(100vh-96px)]">
        {/* Background Content */}
        <div
          className={`w-full transition-all duration-300 ${
            showForm ? 'filter blur-sm opacity-50 pointer-events-none' : ''
          }`}
        >
          <p className="text-center text-lg mb-6">
            Upload your tickets and let AI classify them automatically.
          </p>
        </div>

        {/* Form Overlay */}
        {showForm && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <Form />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
