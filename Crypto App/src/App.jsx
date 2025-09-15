// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import List from './List'
import axios from "axios";

const App = () => {
  const [coins, setCoins] = useState([]);

  // Fetch coins once here
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
      );
      setCoins(response.data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Pass coins as a prop to Home and Watchlist */}
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/watchlist" element={<List coins={coins} />} />
      </Routes>
    </Router>
  );
};

export default App;
