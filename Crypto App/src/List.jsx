import React, { useEffect, useState } from 'react';

const List = ({ coins }) => {
  const [listCoins, setListCoins] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // Get the saved indexes from sessionStorage
      const arr = JSON.parse(sessionStorage.getItem('list')) || [];

      // Filter coins by indexes
      const filtered = coins.filter((_, idx) => arr.includes(idx));

      // Update state
      setListCoins(filtered);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>

      {listCoins.length === 0 ? (
        <p className="text-gray-500">No coins selected.</p>
      ) : (
        <div className="space-y-3">
          {listCoins.map((coin) => (
            <div
              key={coin.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center space-x-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                <span className="font-semibold">{coin.name}</span>
              </div>
              <div className="text-right">
                <p>Price: ${coin.current_price.toLocaleString()}</p>
                <p
                  className={
                    coin.market_cap_change_percentage_24h > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {coin.market_cap_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
