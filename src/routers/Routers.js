import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Final from '../pages/Final';
import Header from '../components/Header/Header';
import Template from '../pages/Template';
import Detail from '../pages/Detail';
import Preview from '../pages/Preview';
function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/final" element={<Final />} />
        <Route path='/template' element={<Template/>}/>
        <Route path="/detail" element={<Detail />} />
        <Route path="/preview" element={<Preview/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;
