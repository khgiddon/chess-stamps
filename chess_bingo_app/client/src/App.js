import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import { percentageToOneInEveryX, customRoundForRatio, formatPercentage, listToCleanList } from './utilityFunctions';
import {Chessboard} from 'react-chessboard';

import io from 'socket.io-client';

// import { createRoot } from 'react-dom/client';
// import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';  // You can choose another theme if you prefer

const BlockUsernameSubmit = ({username, setUsername, handleSubmit}) => (
  <div className="usernameContainer">
  <input 
      type="text"
      placeholder="Enter your lichess username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
  />
  <button onClick={handleSubmit}>Submit</button>
</div>
);

const socket = io('http://localhost:5000');

function ChessOpeningsCollector() {
  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState('khg002');
  const [loadedusername, setLoadedUsername] = useState('khg002');
  const [totalgames, setTotalGames] = useState(0); 
  const [totalstamps, setTotalStamps] = useState(0);
  const [uniquestamps, setUniqueStamps] = useState(0);
  const [uniquestampsall, setUniqueStampsAll] = useState(0);  
  const [mostpopularwhite, setMostPopularWhite] = useState([]);
  const [mostpopularwhitemin10, setMostPopularWhiteMin10] = useState([]);
  const [mostpopularblack, setMostPopularBlack] = useState([]);
  const [mostpopularblackmin10, setMostPopularBlackMin10] = useState([]);
  const [mostpopularmissingstamp, setMostPopularMissingStamp] = useState([]);
  const [mostobscurestamp, setMostObscureStamp] = useState([]);
  const [othermissingstamps, setOtherMissingStamps] = useState([]);
  const [progress, setProgress] = useState(0);


  const fetchData = useCallback((username = 'khg002') => {

    const handleProgress = (progress_int) => {
      setProgress(progress_int);
    };    

    setProgress(0);  // Start progress at 0%
    socket.on('progress', handleProgress);    

    fetch(`http://127.0.0.1:5000/openings?username=${username}`)
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
          setUniqueStamps(data.unique_stamps);
          setUniqueStampsAll(data.unique_stamps_all);          
          setLoadedUsername(data.loaded_username);
          setMostPopularWhite(data.most_popular_white);
          setMostPopularWhiteMin10(data.most_popular_white_min10);
          setMostPopularBlack(data.most_popular_black);
          setMostPopularBlackMin10(data.most_popular_black_min10);
          setMostPopularMissingStamp(data.most_popular_missing_stamp);
          setMostObscureStamp(data.most_obscure_stamp);
          setOtherMissingStamps(data.other_missing_stamps);
          console.log(data);
          console.log(mostobscurestamp);
          setProgress(100);  // End progress at 100%
          socket.off('progress', handleProgress);          

      })
      .catch(error => {
        setProgress(100);  // End progress at 100%
        socket.off('progress', handleProgress);        
        console.error("Error fetching data:", error);
      });
    }, []);  // Empty array means no dependencies, fetchData will not change across re-renders

  // Fetch data when the component is first mounted using the default username
  useEffect(() => {
    fetchData();
  }, [fetchData]);  // fetchData is now a stable function reference


  const handleSubmit = () => {
    fetchData(username);
  }

  // Front end components
  const ChessImage = React.memo(({ fen, id }) => {
    useEffect(() => {
      console.log('ChessImage rendered', { fen, id });
    }, []); // Empty array to only log on initial render

    return (
      <Chessboard
        position={fen}
        id={id}
        arePiecesDraggable={false}
      />
    );
  });

  const BlockHeader = () => (
    <div>
      <div className="stampImageContainer">
      <img src="assets/stamp_images/image.webp" alt="Stamp" className='stampImage'/>
      <img src="assets/stamp_images/image (1).webp" alt="Stamp" className='stampImage'/>
      <img src="assets/stamp_images/image (5).webp" alt="Stamp" className='stampImage'/>          
      <img src="assets/stamp_images/image (6).webp" alt="Stamp" className='stampImage'/>
      <img src="assets/stamp_images/image (4).webp" alt="Stamp" className='stampImage'/>
    </div>
    <h1>Chess Opening Stamp Collector</h1>
    <h3>How many chess opening stamps have you collected?</h3>
  </div>
  );

  const BlockSummaryText = () => (
    <div>
        <p className="smallText">
        <b>Q:</b> What are "chess opening stamps"? <br/><br />
        <b>A:</b> Every time you reach a <u>named opening position</u>, you collect a stamp! You can collect multiple stamps in the same game. For example, if you play the Ruy Lopez, you'll collect a stamp for the King's Pawn Game, the King's Knight Opening, the King's Knight Opening: Normal Variation, the Ruy Lopez, and whatever subsequent variation of the Ruy Lopez you end up in.
        </p>
  </div>
  );

  const ProgressBar = ({ progress }) => (
    <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
);    

  const ResultsSummary = () => (
    <div>
      <p className="summaryText">
        Analyzed <b>{totalstamps}</b> opening stamps from <b>{totalgames}</b> games played by <b>{loadedusername}</b>.
        <br/><br/>
        You've collected <b>{uniquestamps}</b> unique stamps out of <b>{uniquestampsall}</b> possible stamps, or <b>{formatPercentage(uniquestamps/uniquestampsall)}%</b> of all stamps.
      </p>
    </div>
  );

  const Row = ({ name, name_description, opening, fen, id, image, text }) => {
    return (
      <tr>
        <td>
          <div align="center">
            <span className="nameText"><b>{name}</b>:</span><br/>
            {/* Add extra line break if name_description is not null  */}
            { name_description? 
              <div><span className="nameDescriptionText">{name_description}</span></div>
            : null
            }          
            <br/>{opening}
          </div>
        </td>
        <td>
          <div>
          <a href={`https://lichess.org/analysis/${fen}`}>
            {<ChessImage
              fen={fen}
              id={id}
              />}
            </a>
          </div>
        </td>
        <td>{text}</td>
      </tr>
    );
  };

  const MemoizedRow = React.memo(Row);

  const DisplayTable = () => (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th style={{width:'15%',padding:'0px'}}>Image</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <Row
          name="Missing stamp"
          opening={mostpopularmissingstamp.name}
          fen={mostpopularmissingstamp.fen}
          id={1}
          text={
          <>
          The most popular stamp you're missing is the <span className="openingHighlight">{mostpopularmissingstamp.name}</span>. 
          You've never played this, but it's played in {percentageToOneInEveryX(mostpopularmissingstamp.all_pct)} of all Lichess games.
          The other most popular stamps you're missing are: <span className="openingHighlight">{listToCleanList(othermissingstamps)}</span>.
          Happy hunting!
          </>
          }
        />
        <Row
          name="Rarest stamp"
          opening={mostobscurestamp.name}
          fen={mostobscurestamp.fen}
          id={2}
          text={`The most obscure stamp you've collected is the ${mostobscurestamp.name}.  You've played this ${mostobscurestamp.player_total_with_children} times. This is only ${percentageToOneInEveryX(mostobscurestamp.all_pct)} Lichess stamps!`}
        />
        <Row
          name="Secret weapon: white"
          name_description="(most played relative to population)"
          opening={mostpopularwhite.name}
          fen={mostpopularwhite.fen}
          id={3}
          text={`You've played this ${mostpopularwhite.player_white_with_children} times, or ${percentageToOneInEveryX(mostpopularwhite.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(mostpopularwhite.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(mostpopularwhite.player_pct_with_children/mostpopularwhite.all_pct)}x as frequently.`}
        />  
        <Row
          name="Secret weapon: black"
          name_description="(most played relative to population)"
          opening={mostpopularblack.name}
          fen={mostpopularblack.fen}
          id={4}
          text={`You've played this ${mostpopularblack.player_black_with_children} times, or ${percentageToOneInEveryX(mostpopularblack.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(mostpopularblack.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(mostpopularblack.player_pct_with_children/mostpopularblack.all_pct)}x as frequently.`}
        />          
        <Row
          name="Repertoire: white"
          name_description="(most played relative to population, min. 10 games)"
          opening={mostpopularwhitemin10.name}
          fen={mostpopularwhitemin10.fen}
          id={5}
          text={`You've played this ${mostpopularwhitemin10.player_white_with_children} times,
                 or ${percentageToOneInEveryX(mostpopularwhitemin10.player_pct_with_children)} stamps.
                That means you play it ${customRoundForRatio(mostpopularwhitemin10.player_pct_with_children/mostpopularwhitemin10.all_pct)}x as frequently as the population.`}
          />      
        <Row
          name="Repertoire: black"
          name_description="(most played relative to population, min. 10 games)"
          opening={mostpopularblackmin10.name}
          fen={mostpopularblackmin10.fen}
          id={6}
          text={`You've played this ${mostpopularblackmin10.player_black_with_children} times,
                or ${percentageToOneInEveryX(mostpopularblackmin10.player_pct_with_children)} stamps.
                That means you play it ${customRoundForRatio(mostpopularblackmin10.player_pct_with_children/mostpopularblackmin10.all_pct)}x as frequently as the population.`}
          />
      </tbody>
    </table>
  );

  return (
    <div>
      <BlockHeader />
      <BlockSummaryText />
      <BlockUsernameSubmit 
        username={username}
        setUsername={setUsername}
        handleSubmit={handleSubmit}
      />
      <ProgressBar progress={progress} />
      <ResultsSummary />
      <DisplayTable />

    </div>
  );
}

export default ChessOpeningsCollector;
