import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { fetchData } from './api/fetchData';

// Components
import TopNav from './components/TopNav';

import BlockUsernameSubmit from './components/BlockUsernameSubmit';
import BlockHeader from './components/BlockHeader';
import ProgressBar from './components/ProgressBar';
import ResultsSummary from './components/ResultsSummary';
import DisplayTable from './components/DisplayTable';
import BlockIntro from './components/BlockIntro';
import LowerButtons from './components/LowerButtons';

function App() {
  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState('khg002');
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [gamesexpected, setGamesExpected] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleFetchData = useCallback((username = 'khg002') => {
    setLoading(true); // Set loading to true when the fetch starts
    fetchData(username, setData, setProgress, setGamesExpected)
      .finally(() => setLoading(false)); // Set loading to false when the fetch is complete
  }, []);

  // Fetch data when the component is first mounted using the default username
  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleSubmit = (newUsername) => {
    handleFetchData(newUsername);
  }

  return (
    <div>
      <TopNav />
      <BlockHeader />
      <div className="intro-container">
        <BlockIntro />
        <BlockUsernameSubmit 
          username={username}
          setUsername={setUsername}
          handleSubmit={handleSubmit}
        />
      </div>

      {loading && username !== 'khg002' && <ProgressBar progress={progress} gamesexpected={gamesexpected} username={username} />}
      {!loading && (
        <div className="results-summary-container">
          <ResultsSummary data={data} username={username} />
        </div>
      )}
      {!loading && <DisplayTable data={data} />}
      {!loading && <LowerButtons 
          username={username}
          setUsername={setUsername}
          handleSubmit={handleSubmit}
        />
        }

    </div>
  );
}

export default App;