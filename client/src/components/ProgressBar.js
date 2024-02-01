import React from 'react';
import Button from '@mui/material/Button';
import {addThousandsSeparator} from '../utilityFunctions';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const ProgressWrapper = ({ progress, gamesexpected, username, abortController }) => {
  const cancelRequest = () => {
    abortController.current.abort();
  };

  return (
    <div className="progress-wrapper">
      <div className="progress-additional-text">
        <Stack direction="column" spacing={1.5} alignItems="center">
          <Box>
            <img src="assets/misc_images/pawn_svg.svg" alt="Loading..." className="chess-piece" />
          </Box>
          <Box>
            <span>
              Loading data and analyzing stamps for&nbsp;<b>{addThousandsSeparator(gamesexpected)}</b>&nbsp;estimated games played by&nbsp;<b>{username}</b>
            </span>
          </Box>
        </Stack>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="progress-text">{progress > 100 ? 100 : progress}%</div>
      </div>

      <div className="progress-cancel-button">
        <Button variant="outlined" onClick={cancelRequest} color='error'>Cancel</Button>
      </div>
      <div className="progress-additional-text">
        <span className='progress-bar-subtitle'>
          The Lichess API is rate-limited. Depending on the number of games, this may take a few minutes.
          Game count is estimated until all data is received.
        </span>
      </div>
    </div>
  );
};

export default ProgressWrapper;