import React from 'react';
import ChessImage from './ChessImage';

const Row = ({ label, label_description, opening, rarity, fen, id, text, pgn }) => {
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
          <a href={`https://lichess.org/analysis/pgn/${[pgn]}`} className="link">
            <ChessImage fen={fen} id={id} />
          </a>
        </div>
        <div className="text">
          <a href={`https://lichess.org/analysis/pgn/${[pgn]}`} className="link">
            <span className="openingHighlight">{opening}</span>
          </a>
          <div className = "rarity">Rarity score: {rarity}</div>
          <div>{text}</div>
        </div>
      </div>
  );
};

const MemoizedRow = React.memo(Row);
export default MemoizedRow;