import React from 'react';
import './Home.css'; // Import the Home-specific CSS

function Home() {
  return (
    <div className='home'>
      <div className='content'>
        <h1>Welcome to SafeDrive!</h1>
        <p>Your Guardian on the Road</p>
        <button className='cta-button'>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
