import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import { percentageToOneInEveryX, customRoundForRatio, formatPercentage, listToCleanList } from './utilityFunctions';
import {Chessboard} from 'react-chessboard';

import { fetchData } from './api/fetchData'; // Import the fetchData function


const BlockUsernameSubmit = ({ username, setUsername, handleSubmit }) => {
  const [inputValue, setInputValue] = useState(username);

  const handleButtonClick = () => {
    setUsername(inputValue);
    handleSubmit(inputValue);
};

  return (
    <div className="usernameContainer">
      <input
        type="text"
        placeholder="Enter your lichess username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
};  

function App() {
  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState('khg002');
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFetchData = useCallback((username = 'khg002') => {
    fetchData(username, setData, setProgress);
  }, [setData, setProgress]); // Include setData and setProgress in the dependency array

  // Fetch data when the component is first mounted using the default username
  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleSubmit = (newUsername) => {
    handleFetchData(newUsername);
}

  // Front end components
  const ChessImage = React.memo(({ fen, id }) => {
    useEffect(() => {
      console.log('ChessImage rendered', { fen, id })
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
    {console.log('Header rendered')}
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
        <div className="progress-bar" style={{ width: `${progress}%` }}>
            {progress}%
        </div>
    </div>
);    

  const ResultsSummary = () => {
    if (!data.total_stamps) return null; // Return null if data is not yet available

    return (
    <div>
      <p className="summaryText">
        Analyzed <b>{data.total_stamps}</b> opening stamps from <b>{data.total_games}</b> games played by <b>{username}</b>.
        <br/><br/>
        You've collected <b>{data.unique_stamps}</b> unique stamps out of <b>{data.unique_stampsall}</b> possible stamps, or <b>{formatPercentage(data.unique_stamps/data.unique_stamps_all)}%</b> of all stamps.
      </p>
    </div>
    );
    };

  const Row = ({ label, label_description, opening, fen, id, image, text }) => {
    return (
      <tr>
        <td>
          <div align="center">
            <span className="nameText"><b>{label}</b>:</span><br/>
            {console.log('Text rendered', { fen, id })}
            {/* Add extra line break if name_description is not null  */}
            { label_description? 
              <div><span className="nameDescriptionText">{label_description}</span></div>
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

  const DisplayTable = () => {
    if (!data.most_popular_missing_stamp) return null; // Return null if data is not yet available

    return (

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th style={{width:'15%',padding:'0px'}}>Image</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <MemoizedRow
          label="Missing stamp"
          opening={data.most_popular_missing_stamp.name}
          fen={data.most_popular_missing_stamp.fen}
          id={1}
          text={
          <>
          The most popular stamp you're missing is the <span className="openingHighlight">{data.most_popular_missing_stamp.name}</span>. 
          You've never played this, but it's played in {percentageToOneInEveryX(data.most_popular_missing_stamp.all_pct)} of all Lichess games.
          The other most popular stamps you're missing are: <span className="openingHighlight">{listToCleanList(data.other_missing_stamps)}</span>.
          Happy hunting!
          </>
          }
        />
        <MemoizedRow
          label="Rarest stamp"
          opening={data.most_obscure_stamp.name}
          fen={data.most_obscure_stamp.fen}
          id={2}
          text={`The most obscure stamp you've collected is the ${data.most_obscure_stamp.name}.  You've played this ${data.most_obscure_stamp.player_total_with_children} times. This is only ${percentageToOneInEveryX(data.most_obscure_stamp.all_pct)} Lichess stamps!`}
        />
        <MemoizedRow
          label="Secret weapon: white"
          label_description="(most played relative to population)"
          opening={data.most_popular_white.name}
          fen={data.most_popular_white.fen}
          id={3}
          text={`You've played this ${data.most_popular_white.player_white_with_children} times, or ${percentageToOneInEveryX(data.most_popular_white.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_white.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(data.most_popular_white.player_pct_with_children/data.most_popular_white.all_pct)}x as frequently.`}
        />
        <Row
          label="Secret weapon: black"
          label_description="(most played relative to population)"
          opening={data.most_popular_black.name}
          fen={data.most_popular_black.fen}
          id={4}
          text={`You've played this ${data.most_popular_black.player_black_with_children} times, or ${percentageToOneInEveryX(data.most_popular_black.player_pct_with_children)} stamps. This is only ${percentageToOneInEveryX(data.most_popular_black.all_pct)} of all Lichess stamps. You play it ${customRoundForRatio(data.most_popular_black.player_pct_with_children/data.most_popular_black.all_pct)}x as frequently.`}
        />
        <MemoizedRow
          label="Repertoire: white"
          label_description="(most played relative to population, min. 10 games)"
          opening={data.most_popular_white_min10.name}
          fen={data.most_popular_white_min10.fen}
          id={5}
          text={`You've played this ${data.most_popular_white_min10.player_white_with_children} times,
                 or ${percentageToOneInEveryX(data.most_popular_white_min10.player_pct_with_children)} stamps.
                That means you play it ${customRoundForRatio(data.most_popular_white_min10.player_pct_with_children/data.most_popular_white_min10.all_pct)}x as frequently as the population.`}
          />
        <MemoizedRow
          label="Repertoire: black"
          label_description="(most played relative to population, min. 10 games)"
          opening={data.most_popular_black_min10.name}
          fen={data.most_popular_black_min10.fen}
          id={6}
          text={`You've played this ${data.most_popular_black_min10.player_black_with_children} times,
                or ${percentageToOneInEveryX(data.most_popular_black_min10.player_pct_with_children)} stamps.
                That means you play it ${customRoundForRatio(data.most_popular_black_min10.player_pct_with_children/data.most_popular_black_min10.all_pct)}x as frequently as the population.`}
          />
      </tbody>
    </table>
    );
  };

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

export default App;
