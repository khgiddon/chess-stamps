import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import { fetchData } from './api/fetchData';
import { fetchAllOpenings } from './api/fetchAllOpenings';


// Components
import TopNav from './components/TopNav';
import BlockUsernameSubmit from './components/BlockUsernameSubmit';
import BlockHeader from './components/BlockHeader';
import ProgressBar from './components/ProgressBar';
import ResultsSummary from './components/ResultsSummary';
import DisplayTable from './components/DisplayTable';
import BlockIntro from './components/BlockIntro';
import LowerButtons from './components/LowerButtons';
import OpeningsGrid from './components/OpeningsGrid';

function App() {
  const [allopenings, setAllOpenings] = useState([]);
  const [username, setUsername] = useState('khg002');
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [gamesexpected, setGamesExpected] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state
  const [hasallopenings, setHasAllOpenings] = useState(false);
  const openingsGridRef = useRef(null);


  const handleFetchData = useCallback((username = 'khg002') => {
    setLoading(true); // Set loading to true when the fetch starts
    fetchData(username, setData, setProgress, setGamesExpected)
      .finally(() => setLoading(false)); // Set loading to false when the fetch is complete
  }, []);

  const handleFetchAllOpenings = async () => {
    await fetchAllOpenings(username, setAllOpenings);
    setHasAllOpenings(true);
  };

  // Fetch data when the component is first mounted using the default username
  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  // Scroll to the openings grid when the openings are loaded
  useEffect(() => {
    if (hasallopenings) {
      document.getElementById('openingsGrid').scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasallopenings]);

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
      <LowerButtons handleFetchAllOpenings={handleFetchAllOpenings} />
      {hasallopenings && <OpeningsGrid allopenings={allopenings}/>}
    </div>
  );
}

export default App;