import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';

const BlockIntro = () => (
  <div>


    <Tooltip 
  title={
    <p className="smallText">
      Every time you reach a <u>named opening position</u>, you collect a "stamp"! You can collect multiple stamps in the same game. For example, if you play the Ruy Lopez, you'll collect a stamp for the King's Pawn Game, the King's Knight Opening, the King's Knight Opening: Normal Variation, the Ruy Lopez, and whatever subsequent variation of the Ruy Lopez you end up in.
    </p>
  } 
  enterTouchDelay={0}
  arrow
  sx={{
    '.MuiTooltip-tooltip': {
      border: '1px solid',
    },  
  }}
>
  <Button 
    variant="contained" 
    color="primary" 
    style={{ borderRadius: 50, textTransform: 'none' }}
    endIcon={<HelpIcon />}
  >
    What are chess opening stamps?
  </Button>
</Tooltip>

<p className="smallText">
      Or click to see stamps from Magnus Carlsen, Hikaru Nakamura, or Daniel Naroditsky.
    </p>
  </div>

  
);

export default BlockIntro;