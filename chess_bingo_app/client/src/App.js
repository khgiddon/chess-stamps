import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { fetchData } from './api/fetchData';

// Components
import BlockUsernameSubmit from './components/BlockUsernameSubmit';
import ChessImage from './components/ChessImage';
import BlockHeader from './components/BlockHeader';
import BlockSummaryText from './components/BlockSummaryText';
import ProgressBar from './components/ProgressBar';
import ResultsSummary from './components/ResultsSummary';
import DisplayTable from './components/DisplayTable';

function App() {
  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState('khg002');
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFetchData = useCallback((username = 'khg002') => {
    fetchData(username, setData, setProgress);
  }, [setData, setProgress]); // Include setData and setProgress in the dependency array

  // Fetch data when the component is first mounted using the default username
  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleSubmit = (newUsername) => {
    handleFetchData(newUsername);
}


  return (
    <div>
      <BlockHeader />
      <BlockSummaryText />
      <BlockUsernameSubmit 
        username={username}
        setUsername={setUsername}
        handleSubmit={handleSubmit}
      />
      <ProgressBar progress={progress} />
      <ResultsSummary data={data} username={username} />
      <DisplayTable data={data} />
    </div>
  );
}

export default App;
