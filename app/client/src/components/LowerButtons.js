import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0em;
  padding: 1em;
  display: flex;
  flex-direction: column; // Change to column orientation
  align-items: center; // Center items horizontally
  justify-content: center; // Center items vertically
  gap: 30px; // Add 40px of vertical space between flex items
`;

const StyledButton = styled.button`
  padding: 0.5em 3em;
  background-color: #007bff;
  font-size: 1.05em;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  min-width: 200px; // Set a minimum width for the buttons

  &:hover {
    background-color: #0056b3;
  }
`;


// LowerButtons.js
const LowerButtons = ({ handleFetchAllOpenings, hasAllOpenings }) => (
    <div>
      <Container>
        <StyledButton onClick={handleFetchAllOpenings}>
          {hasAllOpenings ? 'Hide all openings' : 'Load all openings'}
        </StyledButton>
      </Container>
    </div>
  );

export default LowerButtons;