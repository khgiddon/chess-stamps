import React from 'react';

const ProgressWrapper = ({ progress, additionalText }) => (
  <div className="progress-wrapper">
    <div className="additional-text">{additionalText}</div>
    {progress < 100 && <img src="assets/misc_images/pawn.png" alt="Loading..." className="chess-piece" />}
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">{progress}%</div>
    </div>
  </div>
);

export default ProgressWrapper;

