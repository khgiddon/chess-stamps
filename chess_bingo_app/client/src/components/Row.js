import React from 'react';
import ChessImage from './ChessImage';

const Row = ({ label, label_description, opening, fen, id, text }) => {
  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
    alignItems: 'flex-start',
  };

  const chessImageStyle = {
    flex: 1,
    maxWidth: '250px', // Set maximum width for the chessboard image
    maxHeight: '250px', // Set maximum height for the chessboard image
    padding: '10px',
    boxSizing: 'border-box',
  };

  const textStyle = {
    flex: 2,
    maxWidth: '70%',
    padding: '10px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#000',
  };

  return (
    <div style={rowStyle}>
      <div style={chessImageStyle}>
        <a href={`https://lichess.org/analysis/${fen}`} style={linkStyle}>
          <ChessImage fen={fen} id={id} />
        </a>
      </div>
      <div style={textStyle}>
        <div style={labelStyle}>{label}:</div>
        {label_description && (
          <div className="nameDescriptionText">{label_description}</div>
        )}
        <a href={`https://lichess.org/analysis/${fen}`} style={linkStyle}>
          {opening}
        </a>
        <div>{text}</div>
      </div>
    </div>
  );
};

const MemoizedRow = React.memo(Row);
export default MemoizedRow;