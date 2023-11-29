import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Updated import statement
import Reports from './pages/Reports';
import Products from './pages/Products';
import Support from './pages/Support';
import Team from './pages/Team';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Dashboard />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/products' element={<Products />} />
          <Route path='/team' element={<Team />} />
          <Route path='/support' element={<Support />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
