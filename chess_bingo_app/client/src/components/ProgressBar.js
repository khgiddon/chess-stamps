import React from 'react';

const ProgressWrapper = ({ progress, additionalText }) => (
  <div className="progress-wrapper">
    <div className="additional-text">{additionalText}More text here</div>
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">{progress}%</div>
    </div>
  </div>
);

export default ProgressWrapper;
