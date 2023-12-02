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
        justifyContent="center"
        alignItems="center"
        marginBottom="0em"
        marginTop="0em"
        width="100%"
      ><p className="smallText">
      Or see results from <a>Magnus Carlsen</a>, <a>Hikaru Nakamura</a>, or <a>Daniel Naroditsky</a>.
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

