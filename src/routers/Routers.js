import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Final from '../pages/Final';
import Header from '../components/Header/Header';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </Router>
  );
}

export default Routers;
