// AlertsBox.js

import React from "react";

const fakeAlerts = [
  {type: "Vibration", location: "Brownsville, TX", time: "12:37"},
  {type: "Vibration", location: "Harlingen, TX", time: "1:02"},
  {type: "Vibration", location: "Falfurias, TX", time: "12:30"},
  {type: "Vibration", location: "San Antonio, TX", time: "4:48"},
]

const AlertsBox = () => {
  return (
    <div className="alerts-box">
      <div className="alert-text">
        <h2>Alerts</h2>
      </div>
      <div className="inner-box">
        {fakeAlerts.map((alert, index) => 
          <div className={`inner-rectangle ${index % 2 == 0 ? "not-shaded" : "shaded"}`}>
            <p>{alert.type}</p>
            <p>{alert.location}</p>
            <p>{alert.time}</p>
          </div>
        )}

        {/*<div className="inner-rectangle not-shaded">
          <p>Vibration</p>
          <p>Brownsville, TX</p>
          <p>12:37</p>
        </div>
        <div className="inner-rectangle shaded">
          <p>Vibration</p>
          <p>Harlingen, TX</p>
          <p>1:02</p>
        </div>
        <div className="inner-rectangle not-shaded">
          <p>Vibration</p>
          <p>Falfurias, TX</p>
          <p>12:30</p>
        </div>
        <div className="inner-rectangle shaded">
          <p>Vibration</p>
          <p>San Antonio, TX</p>
          <p>4:48</p>
        </div>*/}
      </div>
    </div>
  );
}

export default AlertsBox;
