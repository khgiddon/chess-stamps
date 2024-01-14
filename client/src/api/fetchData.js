import { socket } from './io';

export const fetchData = async (username, timeframe, previousUsername, previousTimeframe, setData, setTimeframe, setUsername, setProgress, setGamesExpected, abortController, error, setError, id, Setid, idFromLoad) => {

const handleProgress = (progressData) => {
      const { percentage_complete, chunks_expected } = progressData;
      setProgress(percentage_complete);
      setGamesExpected(chunks_expected);
    };

  setError(null);

  setProgress(0);  // Start progress at 0%
  socket.on('progress', handleProgress);


  try {
      let url = `http://127.0.0.1:5000/openings?username=${username}&timeframe=${timeframe}`;

      // Add id to URL if it exists
      console.log('idFromLoad.current',idFromLoad.current)
      if (idFromLoad.current !== 'none') {
        url += `&id=${idFromLoad.current}`;
        console.log('url',url, idFromLoad.current)

        // Reset loaded id to null after adding it to the URL, so it doesn't get added again
        idFromLoad.current = 'none';
      }
      
      const response = await fetch(url, { signal: abortController.current.signal });
      if (!response.ok) {
          
        if (response.status === 429) {
          console.log('Rate limit exceeded');
          throw new Error("Rate limit exceeded");
        }
        if (response.status === 400) {
          console.log('Could not find username on Lichess');
          throw new Error("Could not find username on Lichess");
        }

          throw new Error("Network response was not ok");

        }

        // Successful API call
        const data = await response.json();

        setData(data);
        console.log(data.most_obscure_stamp);

        // Overwrite username and timeframe with values from API call 
        // This will occur if the database was pulled
        setUsername(data.loaded_username);
        setTimeframe(data.loaded_timeframe);

        // Set previous username (last correct username) if API call succeeds
        console.log('setting previous username to',username)
        previousUsername.current = username;
        previousTimeframe.current = timeframe;

      } catch (error) {

            // Return to previous username (last correct username) if API call fails
            console.log('call failed: setting username to',previousUsername)

            setError(error);
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
