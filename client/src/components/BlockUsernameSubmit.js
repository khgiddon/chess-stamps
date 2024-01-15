import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';



const BlockUsernameSubmit = ({ username = '', setUsername, handleSubmit, loading, timeframe, setTimeframe, error}) => {
  const [inputValue, setInputValue] = useState(username);

  const handleButtonClick = () => {
    setUsername(inputValue);
    handleSubmit(inputValue, timeframe);
  };

  const handleStoredUsernameClick = (storedUsername) => {
    setUsername(storedUsername);
    handleSubmit(storedUsername, timeframe); //Note: Timeframe ignored here on the backend
  }

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const [isHovered, setIsHovered] = useState(false);

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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          borderColor={isHovered ? "grey.800" : "grey.500"}
          borderRadius="8px"
          padding="1em"
        >
          <TextField
            type="text"
            placeholder="Enter your Lichess username"
            value={inputValue === 'drnykterstein' ? '' : inputValue}
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
          <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={loading}>
            Analyze
          </Button>
        </Box>
      </Box>
      <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginBottom="0em"
            marginTop="0em"
            padding="0px"
            width="100%">

      </Box>
      <p className="select-timeframe-text">
          Check games from: 
          <Select
              value={timeframe}
              onChange={(event) => setTimeframe(event.target.value)}
              variant="standard"
              size="small"
              style={{ fontSize: '1em', marginLeft: '10px' }}
            >
              <MenuItem value="last 24 hours">last 24 hours</MenuItem>
              <MenuItem value="last week">last week</MenuItem>
              <MenuItem value="last month">last month</MenuItem>
              <MenuItem value="last 3 months">last 3 months</MenuItem>
              <MenuItem value="last 12 months">last 12 months</MenuItem>
              <MenuItem value="forever">forever</MenuItem>
            </Select>
        </p>
        {error && (
            <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginBottom="0em"
            width="100%">
              <Alert variant='filled' severity="error" sx={{ width: '100%', marginBottom: '1em' }}>ERROR: {error.message}</Alert>
            </Box>)}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        marginBottom="0em"
        marginTop="0em"
        paddingTop='0em'
        width="100%"
      >   
    <p className="grandmaster-names-block">
    <div className='centered'>
     Or click to see all-time results from:
     </div>
      <Stack direction="row" spacing={1} sx={{ mt: 1, p:0}}>
      <Stack spacing={1}>
         <ul>
          <li><a onClick={() => handleStoredUsernameClick('drnykterstein')}>GM Magnus Carlsen</a></li>
          <li><a onClick={() => handleStoredUsernameClick('alireza2003')}>GM Alireza Firouzja</a></li>
         </ul>
        </Stack>
        <Stack spacing={1} sx={{ p: 0 }}>
        <ul>
          <li><a onClick={() => handleStoredUsernameClick('nihalsarin2004')}>GM Nihal Sarin</a></li>
          <li><a onClick={() => handleStoredUsernameClick('rebeccaharris')}>GM Daniel Naroditsky</a></li>
        </ul>  
        </Stack>
      </Stack>
    </p>


      </Box>


    </Box>
  );
};


export default BlockUsernameSubmit;
