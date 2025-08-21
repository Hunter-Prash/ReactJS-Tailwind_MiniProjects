import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Address from './Address';
import Pref from './Pref';
import Review from './Review';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/address" element={<Address />} />
        <Route path="/preferences" element={<Pref />} />
        <Route path='/review' element={<Review/>}/>
      </Routes>
    </Router>
  );
};

export default App;
