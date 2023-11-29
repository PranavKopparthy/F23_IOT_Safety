// ProfilePicture.js

import React from 'react';

const ProfilePicture = () => {
  return (
    <div className="profile-picture-container">
      <img
        src="/driver.png"
        alt="Profile Picture"
        className="profile-picture-img"
      />
      <div className="text-container">
        <p className="profile-picture-text">Sebastian Lopez</p>
        <p className="profile-picture-driver-position">Driver</p>
      </div>
    </div>
  );
}

export default ProfilePicture;
