import React, { useState, useEffect, useCallback, useRef, createContext } from 'react';


import './App.css';

// API
import { fetchData } from './api/fetchData';

// Components
import UsernameSubmit from './components/UsernameSubmit';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import ResultsSummary from './components/ResultsSummary';
import DisplayTable from './components/DisplayTable';
import Intro from './components/Intro';
import LowerButtons from './components/LowerButtons';
import OpeningsGrid from './components/OpeningsGrid';
import Footer from './components/Footer';
import AuthDialog from './components/AuthDialog';

// Auth
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const askedForAuth = useRef(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);


  const [allopenings, setAllOpenings] = useState([]);
  const [username, setUsername] = useState('drnykterstein');
  const previousUsername = useRef(null);
  const previousTimeframe = useRef('last 3 months');
  const [timeframe, setTimeframe] = useState('last 3 months');
  const [data, setData] = useState([]);
  const idFromLoad = useRef(null);
  const [id, setId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [gamesexpected, setGamesExpected] = useState(0);
  const [loading, setLoading] = useState(false); // Added loading state
  const [hasallopenings, setHasAllOpenings] = useState(false);
  const abortController = useRef(null);  // Use useRef to hold the AbortController
  const [error, setError] = useState(null);

  const handleFetchData = useCallback((username = 'drnykterstein', timeframe = 'last 3 months') => {

    if (!isAuthenticated && !askedForAuth.current && !showAuthDialog && username !== 'drnykterstein'  && idFromLoad.current === 'none' && id === null) {
      // If the user is not authenticated, show the AuthDialog
      setLoading(true)
      console.log('askedForAuth:', askedForAuth);
      console.log('username', username);
      setShowAuthDialog(true);
      return;
    }
    
    if (abortController.current) {  // If there's an existing AbortController
      abortController.current.abort();  // Abort any ongoing fetch request
    }
    abortController.current = new AbortController();  // Create a new AbortController for the new fetch request
    // console.log(timeframe)
    setLoading(true); // Set loading to true when the fetch starts
    setHasAllOpenings(false);
    console.log('previousUsername',previousUsername);
    console.log('idFromLoad',idFromLoad.current);
    fetchData(username, timeframe, previousUsername, previousTimeframe, setData, setTimeframe, setUsername, setProgress, setGamesExpected, abortController, error, setError, id, setId, idFromLoad)
      .finally(() => setLoading(false)); // Set loading to false when the fetch is complete
    },[]); 


  // Fetch data when the component is first mounted
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id') || 'none';
    const state = urlParams.get('state');
    idFromLoad.current = idFromUrl;  // Update the ref



    if (idFromUrl !== 'none') {
      // If there's an id in the URL, fetch data using the id
      console.log('fetching data from URL ID')
      handleFetchData('drnykterstein', 'last 3 months', idFromUrl);
      return;
    }

    if (state) {
      // If there's a state in the URL, fetch data using the username and timeframe from the state
      setIsAuthenticated(true);
      askedForAuth.current = true;
      console.log('fetching data from state')
      const { username, timeframe } = JSON.parse(atob(state));
      console.log('decoding state', atob(state))
      console.log('state',username)
      console.log('timeframe',timeframe)
      console.log('isAuthenticated',isAuthenticated)
      setUsername(username);
      setTimeframe(timeframe);
      handleFetchData(username, timeframe, idFromUrl);
      return;
    }

    // If there's no id or state in the URL, fetch data using the default username
    console.log('fetching data from default username')
    handleFetchData('drnykterstein', 'last 3 months', idFromUrl);
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

  const handleSubmit = (newUsername, newTimeframe) => {
    handleFetchData(newUsername, newTimeframe);
    console.log('newTimeframe', newTimeframe);
    }

  const handleAuthDialogClose = () => {
      setShowAuthDialog(false);
      askedForAuth.current = true;
      handleFetchData(username, timeframe);
    };


  const storedUsernames = ['khg002', 'drnykterstein', 'alireza2003', 'rebeccaharris','nihalsarin2004'];         

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <div>

      <div className='upper-container'>
        <Header />
        <AuthDialog open={showAuthDialog} handleClose={handleAuthDialogClose} username={username} timeframe={timeframe} />

        <div className="intro-container">
          <UsernameSubmit 
            username={username}
            setUsername={setUsername}
            handleSubmit={handleSubmit}
            loading={loading}
            setTimeframe={setTimeframe}
            timeframe={timeframe}
            error={error}
          />
          <Intro />
        </div>
        {loading && !storedUsernames.some(storedUsername => storedUsername.toLowerCase() === username.toLowerCase()) && <ProgressBar progress={progress} gamesexpected={gamesexpected} username={username} abortController={abortController} />}
        {!loading && (
            <ResultsSummary data={data} username={username} timeframe={previousTimeframe.current} />
        )}
      </div>
      <div className = 'lower-container'>
        {!loading && <DisplayTable data={data} username={username} />}
        {!loading && <LowerButtons 
        handleAllOpeningsButtonClick={handleAllOpeningsButtonClick} hasAllOpenings={hasallopenings}
        />}
        {hasallopenings && <OpeningsGrid allopenings={data.openings}/>}
        {!loading && <Footer />}
    </div>
  </div>
  </AuthContext.Provider>
  );
}
export default App;