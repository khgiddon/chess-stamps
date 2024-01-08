import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';



const BlockUsernameSubmit = ({ username = '', setUsername, handleSubmit }) => {
  const [inputValue, setInputValue] = useState(username);
  const [timeframe, setTimeframe] = useState('last 3 months');

  const handleButtonClick = () => {
    setUsername(inputValue);
    console.log(timeframe)
    handleSubmit(inputValue, timeframe);
  };

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
            value={inputValue === 'khg002' ? '' : inputValue}
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
          Or click to see all-time results from <a>Magnus Carlsen</a>, <a>Hikaru Nakamura</a>, or <a>Daniel Naroditsky</a>.
        </p>
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

