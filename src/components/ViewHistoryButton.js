// ViewHistoryButton.js

import React from 'react';

const ViewHistoryButton = (props) => {
  return (
    <button onClick={props.onClick} className="view-history-button">
      View {props.viewingArchive ? "Current Drive" : "History"}
      <img src="clock.svg" alt="View History Icon" className="view-history-icon" />
    </button>
  );
}

export default ViewHistoryButton;
