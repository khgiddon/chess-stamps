import React from 'react';

const ProgressWrapper = ({ progress, gamesexpected, username }) => (
  <div className="progress-wrapper">
    <div className="progress-additional-text">
    <span>
        Loading data and analyzing stamps for&nbsp;<b>{gamesexpected}</b>&nbsp;games played by&nbsp;<b>{username}</b>
    </span>
    { (
            <img src="assets/misc_images/pawn.png" alt="Loading..." className="chess-piece" />
    )}
    </div>
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">{progress > 100 ? 100 : progress}%</div>
    </div>
  </div>
);

export default ProgressWrapper;