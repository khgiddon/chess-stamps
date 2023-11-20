import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center; /* Align items horizontally center */
  justify-content: center; /* Center vertically if there's extra space */
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const StyledLabel = styled.label`
  margin-right: 0.5em;
`;

const StyledInput = styled.input`
  flex-grow: 1; /* Allow input to grow */
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
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
      <InputContainer>
        <StyledLabel>Enter your Lichess username:</StyledLabel>
        <StyledInput
          type="text"
          placeholder="Enter your lichess username"
          value={inputValue}
          onChange={handleChange}
          required
        />
      </InputContainer>
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
