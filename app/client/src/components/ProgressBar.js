import React from 'react';
import Button from '@mui/material/Button';

const ProgressWrapper = ({ progress, gamesexpected, username, cancelRequest }) => (
  <div className="progress-wrapper">
    <div className="progress-additional-text">
      <span>
        Loading data and analyzing stamps for&nbsp;<b>{gamesexpected}</b>&nbsp;games played by&nbsp;<b>{username}</b>
      </span>
      { (
        <img src="assets/misc_images/pawn_svg.svg" alt="Loading..." className="chess-piece" />
      )}
    </div>
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">{progress > 100 ? 100 : progress}%</div>
    </div>
    <div className="progress-additional-text">
      <span className='progress-bar-subtitle'>
        The Lichess API is rate-limited. Depending on the number of games, this may take a few minutes.
      </span>
    </div>
    <div className="progress-cancel-button">
      <Button variant="outlined" onClick={cancelRequest} color='error'>Cancel</Button>
    </div>
  </div>
);

export default ProgressWrapper;