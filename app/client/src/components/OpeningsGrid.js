import React, { useState } from 'react';
import ChessImage from './ChessImage';

const OpeningsGrid = ({ allopenings }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFen, setCurrentFen] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX + 10, y: event.clientY + 10 }); // Add an offset of 10px
  };

  return (
    <div id="openingsGrid" className="all-openings-grid-container">
      <div id="chessImageContainer" style={{ left: position.x, top: position.y }}>
        {isHovered && <ChessImage fen={currentFen} id={currentId} />}
      </div>
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
  );
}

export default OpeningsGrid;