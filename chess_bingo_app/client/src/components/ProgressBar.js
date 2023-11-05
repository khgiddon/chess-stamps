import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
      </div>
  </div>
);

export default ProgressBar;