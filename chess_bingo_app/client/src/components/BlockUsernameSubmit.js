import React, { useState } from 'react';

const BlockUsernameSubmit = ({ username, setUsername, handleSubmit }) => {
  const [inputValue, setInputValue] = useState(username);

  const handleButtonClick = () => {
    setUsername(inputValue);
    handleSubmit(inputValue);
  };

  return (
    <div className="usernameContainer">
      <input
        type="text"
        placeholder="Enter your lichess username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
};

export default BlockUsernameSubmit;