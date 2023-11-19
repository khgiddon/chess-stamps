import { socket } from './io';

// The fetchData function is now exported and can be imported in other components
export const fetchData = async (username, setData, setProgress, setGamesExpected) => {

console.log(typeof setProgress); // Should log 'function'


const handleProgress = (progressData) => {
      const { percentage_complete, chunks_expected } = progressData;
      setProgress(percentage_complete);
      setGamesExpected(chunks_expected);
    };

  setProgress(0);  // Start progress at 0%
  socket.on('progress', handleProgress);

  try {
        const response = await fetch(`http://127.0.0.1:5000/openings?username=${username}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        console.log(data);
        console.log(data.most_obscure_stamp);
  } catch (error) {
        console.error("Error fetching data:", error);
        // TODO: Handle errors
  } finally {
        setProgress(100);  // End progress at 100%
        socket.off('progress', handleProgress);
  }
};
