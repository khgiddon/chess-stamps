import React from 'react';

const OpeningsGrid = ({ allopenings }) => {
    return (
      <div id="openingsGrid" className="all-openings-grid-container">
        {allopenings.map((opening, index) => (
          <div 
            key={index} 
            className={`all-openings-grid-item ${opening.player_total_with_children > 0 ? 'colorful' : ''}`}
          >
            <a href={`https://lichess.org/analysis/pgn/${[opening.pgn]}`}>
              {opening.name}
            </a>
          </div>
        ))}
      </div>
    );
  }

export default OpeningsGrid;
