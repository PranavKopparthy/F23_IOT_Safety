import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Updated import statement
import Reports from './pages/LiveAlerts';
import Products from './pages/Drivers';
import Support from './pages/Support';
import Team from './pages/Team';
import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { onValue, ref } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';

function App() {
  const [bpm, setBpm] = useState(0);

  useEffect(() => {
    const query = ref(db, `UsersData/${process.env.REACT_APP_USER_ID}/readings`)
    
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      //if (snapshot.exists()) {
      const processdata= data ? Object.entries(data).map(e => ({timestamp: Number(e[0]), BPM: Number(e[1].heartRate)})) : []
      console.log(processdata)
      setBpm(processdata)
      //}
    })
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Dashboard bpmData={bpm} />} />
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
