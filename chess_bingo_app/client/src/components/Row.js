import React from 'react';
import ChessImage from './ChessImage';

const Row = ({ label, label_description, opening, fen, id, text, icon }) => {
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
          <a href={`https://lichess.org/analysis/${fen}`} className="link">
            <ChessImage fen={fen} id={id} />
          </a>
        </div>
        <div className="text">
          <a href={`https://lichess.org/analysis/${fen}`} className="link">
            <span className="openingHighlight">{opening}</span>
          </a>
          <div>{text}</div>
        </div>
      </div>
  );
};

const MemoizedRow = React.memo(Row);
export default MemoizedRow;