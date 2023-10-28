import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';  // You can choose another theme if you prefer


function ChessOpeningsCollector() {
  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState('khg001');
  const [loadedusername, setLoadedUsername] = useState('khg001');
  const [totalgames, setTotalGames] = useState(0); 
  const [totalstamps, setTotalStamps] = useState(0);
  const [mostpopularwhite, setMostPopularWhite] = useState([]);
  const [mostpopularwhitemin10, setMostPopularWhiteMin10] = useState([]);
  const [mostpopularblack, setMostPopularBlack] = useState([]);
  const [mostpopularblackmin10, setMostPopularBlackMin10] = useState([]);
  const [mostpopularmissingstamp, setMostPopularMissingStamp] = useState([]);
  const [mostobscurestamp, setMostObscureStamp] = useState([]);


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
          setMostPopularWhite(data.most_popular_white);
          setMostPopularWhiteMin10(data.most_popular_white_min10);
          setMostPopularBlack(data.most_popular_black);
          setMostPopularBlackMin10(data.most_popular_black_min10);
          setMostPopularMissingStamp(data.most_popular_missing_stamp);
          setMostObscureStamp(data.most_obscure_stamp);
          console.log(data);
          console.log(mostobscurestamp);

      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  const handleSubmit = () => {
    fetchData(username);
  }
// ------------------------------------------------
// Other functions
// ------------------------------------------------

// Convert a percentage to "1 in every X"
function percentageToOneInEveryX(percentage) {
  if (percentage === 0) {
    return "Never";
  }
  const oneInX = 1 / percentage;
  const roundedOneInX = Math.round(oneInX).toLocaleString(); // Rounds to the nearest integer and adds thousands separators
  return `1 in every ${roundedOneInX}`;
}

// Custom rounding function for ratios
function customRoundForRatio(num) {
  if (num > 10) {
    return Math.round(num);
  } else {
    return parseFloat(num.toFixed(2));
  }
}

  // DATA TABLE FORMATTING
  const gridOptions = {
    defaultColDef: {
      sortable: true
    }
    };

  const gridRef = useRef(null); // Create a reference

  const onGridReady = (params) => {
      // Call sizeColumnsToFit() after the grid has initialized
      params.api.sizeColumnsToFit();
  };

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

  const columns = [
    { headerName: "Opening"
    , field: "name"
    , autoHeight: true
    , cellStyle: {whiteSpace: 'normal'}
    , minWidth: 400
    },
    { headerName: "PGN", field: "pgn" },
    {
        headerName: "% of stamps (all Lichess games)",
        field: "all_pct",
        valueFormatter: params => formatPercentage(params.value) + '%'
    },
    { headerName: "Player stamps (white)", field: "player_white_with_children" },
    { headerName: "Player stamps (black)", field: "player_black_with_children" },
    {
        headerName: "% of player stamps (white)",
        field: "white_pct_with_children",
        valueFormatter: params => (params.value * 100).toFixed(1) + '%'
    },
    {
        headerName: "% of player stamps (black)",
        field: "black_pct_with_children",
        valueFormatter: params => (params.value * 100).toFixed(1) + '%'
    }
];

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

        <p className="summaryText">The most popular stamp you're missing is the <b>{mostpopularmissingstamp.name}</b>.  You've never played this, but it's played in {percentageToOneInEveryX(mostpopularmissingstamp.all_pct)} of all Lichess games.</p>

        <p className="summaryText">The most obscure stamp you've collected is the <b>{mostobscurestamp.name}</b>.  You've played this {mostobscurestamp.player_total_with_children} times, but this is only {percentageToOneInEveryX(mostobscurestamp.all_pct)} of all Lichess stamps!</p>

        <p className="summaryText">
          As white, the stamp you play most often relative to all of Lichess is the <b>{mostpopularwhite.name}</b>. 
          You've played this {mostpopularwhite.player_white_with_children} times, or {percentageToOneInEveryX(mostpopularwhite.player_pct_with_children)} stamps, but this is only {percentageToOneInEveryX(mostpopularwhite.all_pct)} of all Lichess stamps!
          That means you play it {customRoundForRatio(mostpopularwhite.player_pct_with_children/mostpopularwhite.all_pct)}x as frequently.
        </p>

        <p className="summaryText">
          As black, the stamp you play most often relative to all of Lichess is the <b>{mostpopularblack.name}</b>. 
          You've played this {mostpopularblack.player_black_with_children} times, or {percentageToOneInEveryX(mostpopularblack.player_pct_with_children)} stamps, but this is only {percentageToOneInEveryX(mostpopularblack.all_pct)} of all Lichess stamps!
          That means you play it {customRoundForRatio(mostpopularblack.player_pct_with_children/mostpopularblack.all_pct)}x as frequently.
        </p>

        <p className="summaryText">
          Secret weapon: As white, the stamp you play most often (min 10 games) relative to all of Lichess is the <b>{mostpopularwhitemin10.name}</b>. 
          You've played this {mostpopularwhitemin10.player_white_with_children} times, or {percentageToOneInEveryX(mostpopularwhitemin10.player_pct_with_children)} stamps, but this is only {percentageToOneInEveryX(mostpopularwhitemin10.all_pct)} of all Lichess stamps!
          That means you play it {customRoundForRatio(mostpopularwhitemin10.player_pct_with_children/mostpopularwhitemin10.all_pct)}x as frequently.
        </p>      

        <p className="summaryText">
          Secret weapon: As black, the stamp you play most often (min 10 games) relative to all of Lichess is the <b>{mostpopularblackmin10.name}</b>. 
          You've played this {mostpopularblackmin10.player_black_with_children} times, or {percentageToOneInEveryX(mostpopularblackmin10.player_pct_with_children)} stamps, but this is only {percentageToOneInEveryX(mostpopularblackmin10.all_pct)} of all Lichess stamps!
          That means you play it {customRoundForRatio(mostpopularblackmin10.player_pct_with_children/mostpopularblackmin10.all_pct)}x as frequently.
        </p>      

        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                columnDefs={columns}
                gridOptions={gridOptions}
                rowData={openings}
                onGridReady={onGridReady} // Attach the onGridReady event handler
                ref={gridRef} // Attach the reference to the grid
                domLayout='autoHeight' // Adjusts height based on number of rows, removes the need to set a static height.
            />
        </div>
    </div>
  );
}

export default ChessOpeningsCollector;
