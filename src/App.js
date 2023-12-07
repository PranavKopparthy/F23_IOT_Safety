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
  const [currentDrive, setCurrentDrive] = useState(null); // list of points, if one exists
  const [archive, setArchive] = useState([]) // list of lists

  useEffect(() => {
    const query = ref(db, `UsersData/${process.env.REACT_APP_USER_ID}/readings`)
    
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      //if (snapshot.exists()) {
      if (data) {
        let processed_data = Object.entries(data).map(drive => [
          Number(drive[0]), 
          Object.entries(drive[1]).map(measurement => ({
            timestamp: Number(measurement[0]), bpm: Number(measurement[1].beatsAverage)
          }))
        ])
        processed_data.sort((a, b) => (b[0] - a[0]))
        processed_data = processed_data.map(e => e[1])
        let elapsed = Date.now() - processed_data[0][processed_data[0].length - 1].timestamp 
        if (elapsed / 1000 > 30) {
          setCurrentDrive(null)
          setArchive(processed_data)
          console.log(processed_data)
        } else {
          setCurrentDrive(processed_data[0])
          setArchive(processed_data.slice(1))
        }
      }
    })
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Dashboard bpmData={currentDrive} archive={archive}/>} />
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
