import React from 'react';

const OpeningsGrid = ({ allopenings }) => {
    return (
      <div id="openingsGrid" className="all-openings-grid-container">
        {allopenings.map((opening, index) => (
          <div 
            key={index} 
            className={`all-openings-grid-item ${opening.player_total_with_children > 0 ? 'colorful' : ''}`}
          >
            {opening.name}
          </div>
        ))}
      </div>
    );
  }

export default OpeningsGrid;
