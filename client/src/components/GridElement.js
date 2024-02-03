import React from 'react';
import ChessImage from './ChessImage';
import { addThousandsSeparator } from '../utilityFunctions';

const GridElement = ({ label, label_description, opening, rarity, fen, id, text, pgn, ply, popularity_rank, unique_stamps_all }) => {
  return (
    <div className="row">
      <div className="label-row">
        <span>
          {label}
        </span>
        {label_description && (
            <span className="label-description">{`${label_description}`}</span>
        )}
      </div>
        <div className="chess-image">
          <a href={`https://lichess.org/analysis/pgn/${[pgn]}`} target="_blank" rel="noopener noreferrer" className="link">
            <ChessImage fen={fen} id={id} />
          </a>
        </div>
        <div className="text">
          <a href={`https://lichess.org/analysis/pgn/${[pgn]}`} target="_blank" rel="noopener noreferrer" className="link">
            <span className="opening-highlight-text">{opening}</span>
          </a>
          <div className = "rarity">
            Popularity rank: {addThousandsSeparator(popularity_rank)} of {addThousandsSeparator(unique_stamps_all)}  •  Rarity score: {rarity}
          </div>
          <div>{text}</div>
        </div>
      </div>
  );
};

const GridElementMemoized = React.memo(GridElement);
export default GridElementMemoized;