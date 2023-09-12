import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import OfflineBoard from './components/offline/OfflineBoard';
import OnlineBoard from './components/online/OnlineBoard';

function AppRouter() {
  return (
    <Router>
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/offline" element={<OfflineBoard />} />
          <Route path="/online" element={<OnlineBoard />} />
       </Routes>
    </Router> 
  );
}

export default AppRouter;
