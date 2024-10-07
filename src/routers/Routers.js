import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Final from '../pages/Final';
import Header from '../components/Header/Header';
import Template from '../pages/Template';
function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/final" element={<Final />} />
        <Route path='/template' element={<Template/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;
