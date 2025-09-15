import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Home = ({ coins }) => {
  // Initialize selected with sessionStorage
  const [selected, setSelected] = useState(() => {
    return JSON.parse(sessionStorage.getItem('list')) || [];
  });

  const navigate=useNavigate()
  // Theme state (saved in sessionStorage)
  const [theme, setTheme] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem('theme'));
    return saved === null ? false : true;
  });

  // Handle single checkbox
  const handleChange = (idx, e) => {
    if (e.target.checked) {
      setSelected([...selected, idx]);
    } else {
      setSelected((prev) => prev.filter((i) => i !== idx));
    }
  };

  // Handle "Select All"
  const handleAll = (e) => {
    if (e.target.checked) {
      const allIndexes = [];
      for (let i = 0; i < coins.length; i++) {
        allIndexes.push(i);
      }
      setSelected(allIndexes);
    } else {
      setSelected([]);
    }
  };

  const handleNavigate = () => {
    let temp = selected;
    sessionStorage.setItem('list', JSON.stringify(temp));
    navigate('/watchlist')
  };

  return (
    <div
      className={
        theme
          ? 'min-h-screen bg-gray-900 text-white p-6'
          : 'min-h-screen bg-white text-gray-900 p-6'
      }
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Top 10 Cryptos</h1>

        {/* Theme toggle */}
        <button
          onClick={() => {
            const temp = !theme;
            sessionStorage.setItem('theme', JSON.stringify(temp));
            setTheme(temp);
          }}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Change Theme
        </button>

        {/* View Watchlist button with styling */}
        <button
          onClick={handleNavigate}
          className="px-4 py-2 ml-4 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition shadow-md hover:shadow-lg"
        >
          View Watchlist
        </button>
      </div>

      {/* Select All checkbox */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.length === coins.length && coins.length > 0}
            onChange={handleAll}
            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400 rounded"
          />
          <span className="font-semibold">Select All</span>
        </label>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {coins.map((item, idx) => (
          <div
            key={idx}
            className={
              theme
                ? 'flex items-center justify-between bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition'
                : 'flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition'
            }
          >
            {/* Left side: checkbox + coin name */}
            <label className="flex items-center space-x-3 w-1/3">
              <input
                type="checkbox"
                checked={selected.includes(idx)}
                onChange={(e) => handleChange(idx, e)}
                className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-400 rounded"
              />
              <span className="font-semibold">{item.name}</span>
            </label>

            {/* Middle: coin image */}
            <div className="w-1/6 flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded-full"
              />
            </div>

            {/* Right side: details */}
            <div className="w-1/2 text-sm text-right space-y-1">
              <p>
                Market Cap Change:{' '}
                <span
                  className={
                    item.market_cap_change_24h > 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }
                >
                  {item.market_cap_change_24h.toLocaleString()}
                </span>
              </p>
              <p>
                % Change:{' '}
                <span
                  className={
                    item.market_cap_change_percentage_24h > 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }
                >
                  {item.market_cap_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
              <p>Total Supply: {item.total_supply ?? 'N/A'}</p>
              <p>Total Volume: {item.total_volume.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
