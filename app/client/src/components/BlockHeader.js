import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const BlockHeader = () => (
  <div>
    <div className="stampImageContainer">
    <img src="assets/stamp_images/logo3.png" alt="Chess Opening Stamp Collector" className='stampImage'/>
    </div>
    {console.log('Header rendered')}
    <h1>How many&nbsp;
    <Tooltip 
          title={
            <p className="smallText">
              Every time you reach a <u>named opening position</u>, you collect a "stamp"! You can collect multiple stamps in the same game. For example, if you play the Ruy Lopez, you'll collect a stamp for the King's Pawn Game, the King's Knight Opening, the King's Knight Opening: Normal Variation, the Ruy Lopez, and whatever subsequent variation of the Ruy Lopez you end up in.
            </p>
          } 
          enterTouchDelay={0}
          arrow
          placement="right"
          sx={{
            '.MuiTooltip-tooltip': {
              border: '1px solid',
            },  
          }}
        >
          <span className='dotted-underline'>chess opening stamps</span>
        </Tooltip>
        &nbsp;have you collected?</h1>
  </div>



  
);

export default BlockHeader;