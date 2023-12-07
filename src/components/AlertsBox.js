// AlertsBox.js

import React from "react";

const fakeAlerts = [
  {type: "Vibration", location: "Brownsville, TX", time: "12:37"},
  {type: "Vibration", location: "Harlingen, TX", time: "1:02"},
  {type: "Vibration", location: "Falfurias, TX", time: "12:30"},
  //{type: "Vibration", location: "San Antonio, TX", time: "4:48"},
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
      </div>
    </div>
  );
}

export default AlertsBox;
