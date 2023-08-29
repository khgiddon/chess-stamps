import React, { useState, useEffect } from 'react';
import './App.css';

function ChessOpeningsCollector() {
  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState('khg001');
  const [loadedusername, setLoadedUsername] = useState('khg001');
  const [totalgames, setTotalGames] = useState(0); 
  const [totalstamps, setTotalStamps] = useState(0); 


  // Fetch data when the component is first mounted using the default username
  useEffect(() => {
    fetchData(username);
  }, []);

  const fetchData = (user = '') => {
    fetch(`http://127.0.0.1:5000/openings?username=${user}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
          setOpenings(data.openings);
          setTotalGames(data.total_games); 
          setTotalStamps(data.total_stamps); 
          setLoadedUsername(data.loaded_username);
          console.log(data);


      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  const handleSubmit = () => {
    fetchData(username);
  }

  const formatPercentage = (value) => {
    // Convert to percentage
    let percentage = value * 100;
  
    // Check for the 1-decimal-place scenario
    if (percentage.toFixed(1) === "0.0") {
      // If 2-decimal-place is also 0, then return "< 0.01%"
      return percentage.toFixed(2) === "0.00" ? "< 0.01" : percentage.toFixed(2);
    } else {
      // Otherwise, return the value with 1 decimal place
      return percentage.toFixed(1);
    }
  }

  return (
    <div>
        <div className="stampImageContainer">
          <img src="assets/stamp_images/image.webp" alt="Stamp" className='stampImage'/>
          <img src="assets/stamp_images/image (1).webp" alt="Stamp" className='stampImage'/>
          <img src="assets/stamp_images/image (5).webp" alt="Stamp" className='stampImage'/>          
          <img src="assets/stamp_images/image (6).webp" alt="Stamp" className='stampImage'/>
          <img src="assets/stamp_images/image (4).webp" alt="Stamp" className='stampImage'/>
       
        </div>
        <h1>Chess Opening Stamp Collector</h1>
        <h3>How many chess opening stamps have you collected?</h3> {/* New H2 Header */}
        <p className="smallText">
        <b>Q:</b> What are "chess opening stamps"? <br/><br />
        <b>A:</b> Every time you reach a <u>named opening position</u>, you collect a stamp! You can collect multiple stamps in the same game. For example, if you play the Ruy Lopez, you'll collect a stamp for the King's Pawn Game, the King's Knight Opening, the King's Knight Opening: Normal Variation, the Ruy Lopez, and whatever subsequent variation of the Ruy Lopez you end up in.
        </p>

        <div className="usernameContainer">
            <input 
                type="text"
                placeholder="Enter your lichess username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSubmit} >Submit</button>
        </div>
        <p className="summaryText">Analyzed <b>{totalstamps}</b> opening stamps from <b>{totalgames}</b> games played by <b>{loadedusername}</b>.</p>

      <table>
        <thead>
          <tr>
            <th>Opening</th>
            <th>PGN</th>
            <th>% of stamps (all Lichess games)</th>
            <th>Player stamps (white)</th>
            <th>Player stamps (black)</th>
            <th>% of player stamps (white)</th>
            <th>% of player stamps (black)</th>
          </tr>
        </thead>
        <tbody>
          {openings.map((opening, index) => (
            <tr key={index}>
              <td>{opening.name}</td>
              <td>{opening.pgn}</td>
              <td>{formatPercentage(opening.all_pct)}%</td>  {/* Format as percentage */}
              <td>{opening.player_white_with_children}</td>
              <td>{opening.player_black_with_children}</td>
              <td>{(opening.white_pct_with_children * 100).toFixed(1)}%</td>  {/* Format as percentage */}
              <td>{(opening.black_pct_with_children * 100).toFixed(1)}%</td>  {/* Format as percentage */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChessOpeningsCollector;
