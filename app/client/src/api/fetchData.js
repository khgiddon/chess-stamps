import { socket } from './io';

// The fetchData function is now exported and can be imported in other components
export const fetchData = async (username, timeframe, setData, setProgress, setGamesExpected, abortController) => {

const handleProgress = (progressData) => {
      const { percentage_complete, chunks_expected } = progressData;
      setProgress(percentage_complete);
      setGamesExpected(chunks_expected);
    };

  setProgress(0);  // Start progress at 0%
  socket.on('progress', handleProgress);

  try {
      const response = await fetch(`http://127.0.0.1:5000/openings?username=${username}&timeframe=${timeframe}`, { signal: abortController.current.signal });
      if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        console.log(data);
        console.log(data.most_obscure_stamp);
      } catch (error) {
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
