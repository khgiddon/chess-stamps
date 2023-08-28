import React, { useState, useEffect } from 'react';

function ChessOpeningsCollector() {
  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState('khg001');  // 1. Set default username

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
        setOpenings(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  const handleSubmit = () => {
    fetchData(username);
  }

  return (
    <div>
      <h1>Chess Opening Stamp Collector</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your lichess username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
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
              <td>{(opening.all_pct * 100).toFixed(1)}%</td>  {/* Format as percentage */}
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
