import React from 'react';
import { Button } from 'react-bootstrap';

const LightsOutGrid = ({ grid, toggleTile, gridSize }) => {
  return (
    <div className="mt-1" style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, auto)`, gap: "0px", justifyContent: "center" }}>
      {grid.map((row, rIdx) =>
        row.map((isOn, cIdx) => (
          <Button
            key={`${rIdx}-${cIdx}`}
            variant={isOn ? "warning" : "dark"}
            className="tile-btn"
            onClick={() => toggleTile(rIdx, cIdx)}
            style={{ width: "30px", height: "30px", padding: 0, margin: 0, borderRadius: 0 }}
          />
        ))
      )}
    </div>
  );
};

export default LightsOutGrid;
