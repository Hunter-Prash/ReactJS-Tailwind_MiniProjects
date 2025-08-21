import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Address from './Address';
import Pref from './Pref';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/address" element={<Address />} />
        <Route path="/preferences" element={<Pref />} />
      </Routes>
    </Router>
  );
};

export default App;
