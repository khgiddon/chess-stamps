import { createSocket } from './io';


export const fetchData = async (username, timeframe, previousUsername, previousTimeframe, setData, setTimeframe, setUsername, setProgress, setGamesExpected, abortController, error, setError, id, Setid, idFromLoad, loadedFromDatabase, setLoadedFromDatabase) => {

console.log('socket username: ', username);
const socket = createSocket(username);

const handleProgress = (progressData) => {
      const { percentage_complete, chunks_expected } = progressData;
      setProgress(percentage_complete);
      setGamesExpected(chunks_expected);
    };

  setError(null);

  setLoadedFromDatabase(false);
  setProgress(0);  // Start progress at 0%
  socket.on('progress', handleProgress);


  try {
      let baseUrl = process.env.REACT_APP_BASE_BACKEND_URL || 'http://127.0.0.1:5000';
      let url = `${baseUrl}/openings?username=${username}&timeframe=${timeframe}`;

      // Add id to URL if it exists
      if (idFromLoad.current !== 'none') {
        url += `&id=${idFromLoad.current}`;
        setLoadedFromDatabase(true);

        // Reset loaded id to null after adding it to the URL, so it doesn't get added again
        idFromLoad.current = 'none';
      }
      
      const response = await fetch(url, { 
        signal: abortController.current.signal,
        credentials: 'include'
      });
      if (!response.ok) {
          
        if (response.status === 429) {
          console.log('Rate limit exceeded');
          throw new Error("Rate limit exceeded");
        }
        if (response.status === 400) {
          console.log('Could not find data for username');
          throw new Error("Could not find data for username");
        }

          throw new Error("Network response was not ok");

        }

        // Successful API call
        const data = await response.json();

        setData(data);

        // Overwrite username and timeframe with values from API call 
        // This will occur if the database was pulled
        setUsername(data.loaded_username);
        setTimeframe(data.loaded_timeframe);

        // Set previous username (last correct username) if API call succeeds
        previousUsername.current = username;
        previousTimeframe.current = timeframe;

      } catch (error) {

            // Return to previous username (last correct username) if API call fails

            setError(error);
            setLoadedFromDatabase(false);
            setUsername(previousUsername.current);
            setTimeframe(previousTimeframe.current);


            if (error.name === 'AbortError') {
              console.log('Fetch request was cancelled');
            } else {
              console.error("Error fetching data:", error);
            }
  } finally {
        setProgress(100);  // End progress at 100%
        socket.off('progress', handleProgress);
  }
};
