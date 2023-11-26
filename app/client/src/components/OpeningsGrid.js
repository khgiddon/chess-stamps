import React, { useState } from 'react';
import ChessImage from './ChessImage';

const OpeningsGrid = ({ allopenings }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFen, setCurrentFen] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const xOffset = 10;
    const yOffset = 10;
    const chessImageWidth = 200; // The width of the chessImageContainer
    const chessImageHeight = 200; // The height of the chessImageContainer

    let x = event.clientX + xOffset;
    let y = event.clientY + yOffset;

    if (x + chessImageWidth > window.innerWidth) {
      x = event.clientX - chessImageWidth - xOffset;
    }

    if (y + chessImageHeight > window.innerHeight) {
      y = event.clientY - chessImageHeight - yOffset;
    }

    setPosition({ x, y });
  };

  return (
    <div>
      <div className='all-openings-intro-text'>
        All openings
      </div>
      <div className="all-openings-grid-container">
        {isHovered && (
          <div id="chessImageContainer" style={{ left: position.x, top: position.y }}>
            <ChessImage fen={currentFen} id={currentId} />
          </div>
        )}
        {allopenings.map((opening, index) => (
          <div 
            key={index} 
            className={`all-openings-grid-item ${opening.player_total_with_children > 0 ? 'colorful' : ''}`}
          >
            <a 
              href={`https://lichess.org/analysis/pgn/${[opening.pgn]}`}
              onMouseEnter={() => {
                setIsHovered(true);
                setCurrentFen(opening.fen);
                setCurrentId(opening.id);
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsHovered(false)}
            >
              {opening.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpeningsGrid;