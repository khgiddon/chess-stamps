import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

function TooltipContent() {
  return (
    <p className="tooltip-content">
      Think of playing chess openings as collecting stamps...
      <ul>
        <li>Every time you reach a named opening position, you collect a "stamp"!</li>
        <li>You can collect multiple stamps in the same game. For example, if you play the Ruy Lopez, you'll collect a stamp for all named openings you pass through:
          <ol>
            <li>King's Pawn Game</li>
            <li>King's Knight Opening</li>
            <li>King's Knight Opening: Normal Variation</li>
            <li>Ruy Lopez</li>
            <li>...and whatever subsequent variations of the Ruy Lopez you end up in...</li>
          </ol>
          </li>  
      </ul>
    </p>
  );
}

const BlockHeader = () => (
  <div>
    <div className="stamp-image-container">
    <img src="assets/stamp_images/logo3.png" alt="Chess Opening Stamp Collector" className='stamp-image'/>
    </div>
    {console.log('Header rendered')}
    <h1>How many&nbsp;
    <Tooltip 
          className="opaque-tooltip"
          title={<TooltipContent />}
          enterTouchDelay={0}
          arrow
          sx={{
            '.MuiTooltip-tooltip': {
              border: '1px solid',
            },  
          }}
        >
          <span className='dotted-underline'>chess opening stamps</span>
        </Tooltip>
        &nbsp;have you collected?&nbsp;&nbsp;

        <Tooltip 
  title={<TooltipContent />}
  enterTouchDelay={0}
  arrow
  sx={{
    '.MuiTooltip-tooltip': {
      border: '1px solid',
    },  
  }}
>
  <HelpIcon className="header-tooltip-icon" color="primary" />
</Tooltip>
        </h1>
  </div>



  
);

export default BlockHeader;