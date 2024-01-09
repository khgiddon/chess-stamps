import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import OpeningsGrid from './components/OpeningsGrid';

function App() {
  const [allopenings, setAllOpenings] = useState([]);
  const [username, setUsername] = useState('drnykterstein');
  const [timeframe, setTimeframe] = useState('last 12 months');
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [gamesexpected, setGamesExpected] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state
  const [hasallopenings, setHasAllOpenings] = useState(false);
  const abortController = useRef(null);  // Use useRef to hold the AbortController




  const handleFetchData = useCallback((username = 'drnykterstein', timeframe = 'last 3 months') => {
    if (abortController.current) {  // If there's an existing AbortController
      abortController.current.abort();  // Abort any ongoing fetch request
    }
    abortController.current = new AbortController();  // Create a new AbortController for the new fetch request
    // console.log(timeframe)
    setLoading(true); // Set loading to true when the fetch starts
    setHasAllOpenings(false);
    fetchData(username, timeframe, setData, setProgress, setGamesExpected, abortController)
      .finally(() => setLoading(false)); // Set loading to false when the fetch is complete
  }, []);

  // Fetch data when the component is first mounted using the default username
    useEffect(() => {
      handleFetchData();
    }, [handleFetchData]);

  // Flip state of hasAllOpenings when the button is clicked
  const handleAllOpeningsButtonClick = () => {
    setHasAllOpenings(!hasallopenings);
  };

  // Scroll to the openings grid when the openings are loaded
  useEffect(() => {
    if (hasallopenings) {
      document.getElementById('openingsGridButton').scrollIntoView({ behavior: 'smooth' });
    }
  }, [hasallopenings]);

  const handleSubmit = (newUsername,newTimeframe) => {
    handleFetchData(newUsername,newTimeframe);
    console.log(newTimeframe)
  }

  const storedUsernames = ['khg002', 'drnykterstein', 'alireza2003', 'rebeccaharris'];         

  return (
    <div>

      <div className='upper-container'>
        <BlockHeader />
        <div className="intro-container">
          <BlockUsernameSubmit 
            username={username}
            setUsername={setUsername}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <BlockIntro />
        </div>
        {loading && !storedUsernames.some(storedUsername => storedUsername.toLowerCase() === username.toLowerCase()) && <ProgressBar progress={progress} gamesexpected={gamesexpected} username={username} abortController={abortController} />}
        {!loading && (
            <ResultsSummary data={data} username={username} />
        )}
      </div>
      <div className = 'lower-container'>
        {!loading && <DisplayTable data={data} />}
        {!loading && <LowerButtons 
        handleAllOpeningsButtonClick={handleAllOpeningsButtonClick} hasAllOpenings={hasallopenings}
        />}
        {hasallopenings && <OpeningsGrid allopenings={data.openings}/>}
    </div>
  </div>
  );
}
export default App;