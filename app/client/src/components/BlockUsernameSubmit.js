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
  marginBottom="1em"
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
  );
};

BlockUsernameSubmit.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BlockUsernameSubmit;