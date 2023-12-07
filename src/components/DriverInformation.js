// DriverInformation.js

import React from 'react';

const DriverInformation = () => {
  return (
    <div className='driver-card'>
      <h2 className='card-header'>Driver Information</h2>

      <div className='info-container'>
        <div className='info-pair'>
          <p className='info-label'>Weight</p>
          <p>175</p>
        </div>

        <div className='info-pair'>
          <p className='info-label'>Height</p>
          <p>5'10"</p>
        </div>

        <div className='info-pair'>
          <p className='info-label'>Medical Conditions</p>
          <button className='view-med-button'>View</button>
        </div>
      </div>
    </div>
  );
}

export default DriverInformation;
