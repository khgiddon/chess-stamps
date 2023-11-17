import React from 'react';
import ChessImage from './ChessImage';

const Row = ({ label, label_description, opening, fen, id, text, icon }) => {


  const labelRowStyle = {
    display: 'grid',
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    backgroundColor: '#3A75C4 ', // Background color for the label row
    color: 'white', // Text color for the label row
    fontWeight: 'bold', // Bold text for the label row
    padding: '0px 0', // Vertical padding for the label row
    textTransform: 'uppercase', // Transform label to uppercase
    fontSize: '1em', // Adjust font size as needed
  };

  const descriptionStyle = {
    textTransform: 'lowercase', // Transform label description to lowercase
    fontSize: '0.9em', // Maintain font size for consistency
    fontWeight: 'bold', // Bold text for consistency
  };

  const chessImageStyle = {
    gridArea: '1 / 1 / 2 / 2',
    maxWidth: '225px',
    maxHeight: '225px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const textStyle = {
    gridArea: '1 / 2 / 2 / 3',
    maxWidth: '70%',
    padding: '10px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#000',
  };

  return (
    <div>
      {/* Small row for label and description */}
      <div style={labelRowStyle}>
        <span>
          {label}
        </span>
        {label_description && (
                  <div>
                    <span style={descriptionStyle}>&nbsp;{`${label_description}`}</span>
                  </div>
        )}

      </div>
      {/* Existing row content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', alignItems: 'flex-start' }}>
        <div style={chessImageStyle}>
          <a href={`https://lichess.org/analysis/${fen}`} style={linkStyle}>
            <ChessImage fen={fen} id={id} />
          </a>
        </div>
        <div style={textStyle}>
          <a href={`https://lichess.org/analysis/${fen}`} style={linkStyle}>
          <span className="openingHighlight">{opening}</span>
          </a>
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};

const MemoizedRow = React.memo(Row);
export default MemoizedRow;