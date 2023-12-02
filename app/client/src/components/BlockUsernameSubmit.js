import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

const BlockUsernameSubmit = ({ username = '', setUsername, handleSubmit }) => {
  const [inputValue, setInputValue] = useState(username);

  const handleButtonClick = () => {
    setUsername(inputValue);
    handleSubmit(inputValue);
  };

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
  <Box>
    <Box
  display="flex"
  flexDirection="row"
  justifyContent="center"
  alignItems="center"
  marginBottom="0em"
  width="100%"
>
<Box
  display="flex"
  flexDirection="row"
  justifyContent="center"
  alignItems="center"
  marginBottom="0em"
  width="100%"
  border={1}
  borderColor="grey.500"
  borderRadius="8px"
  padding="1em"
>
  <TextField
    type="text"
    placeholder="Enter your Lichess username"
    value={inputValue}
    onChange={handleChange}
    id="outlined-basic"
    required
    fullWidth
    variant="standard"
    style={{ marginRight: '20px' }}
    InputProps={{
      disableUnderline: true,
    }}
  />
  <Button variant="contained" color="primary" onClick={handleButtonClick}>
    Analyze
  </Button>
</Box>
</Box>
<Box
  display="flex"
  flexDirection="row"
  justifyContent="right"
  alignItems="center"
  marginBottom="1em"
  marginTop="0.3em"
  width="100%"
>
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
    <span className='tooltip-text'>What are chess opening stamps&nbsp; <HelpIcon color="primary" /></span> 
  </Tooltip>
</Box>
</Box>
  );
};

BlockUsernameSubmit.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BlockUsernameSubmit;