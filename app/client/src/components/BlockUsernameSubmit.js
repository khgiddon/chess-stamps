import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
    <Box 
      sx={{
        margin: '1em',
        padding: '1em',
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1em',
        }}
      >
        <label style={{ marginRight: '0.5em' }}>Enter your Lichess username:</label>
        <TextField
          type="text"
          placeholder="Username"
          value={inputValue}
          onChange={handleChange}
          id="outlined-basic"
          required
          fullWidth
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Analyze
      </Button>
    </Box>
  );
};

BlockUsernameSubmit.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BlockUsernameSubmit;