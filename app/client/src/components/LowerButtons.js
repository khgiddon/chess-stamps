import React from 'react';
import Button from '@mui/material/Button';

const LowerButtons = ({ handleFetchAllOpenings, hasAllOpenings }) => (
    <div className='show-all-openings-button-container'>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleFetchAllOpenings} 
      >
        {hasAllOpenings ? 'Hide all openings' : 'Load all openings'}
      </Button>
    </div>
  );

export default LowerButtons;