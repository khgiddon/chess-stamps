import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column; /* Changed to column layout */
  align-items: flex-start; /* Align items to the start */
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5em; /* Spacing between label and input */
`;

const StyledInput = styled.input`
  flex: 1;
  margin-bottom: 1em; /* Spacing between input and button */
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%; /* Ensure input takes full width */
`;

const StyledButton = styled.button`
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

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
    <Container>
      <StyledLabel>Enter your Lichess username:</StyledLabel>
      <StyledInput
        type="text"
        placeholder="Enter your lichess username"
        value={inputValue}
        onChange={handleChange}
        required
      />
      <StyledButton onClick={handleButtonClick}>Analyze</StyledButton>
    </Container>
  );
};

BlockUsernameSubmit.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default BlockUsernameSubmit;
