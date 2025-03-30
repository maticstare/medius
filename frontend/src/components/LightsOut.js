import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const generateGrid = (size) => {
  return Array.from({ length: size }, () => Array(size).fill(false));
};

function LightsOut() {
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState(generateGrid(gridSize));
  const [startingGrid, setStartingGrid] = useState(generateGrid(gridSize));

  const toggleTile = (row, col) => {
    const newGrid = grid.map((r, i) => [...r]);
    const toggle = (r, c) => {
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
        newGrid[r][c] = !newGrid[r][c];
      }
    };

    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col);
    toggle(row, col - 1);
    toggle(row, col + 1);

    setGrid(newGrid);
  };

  const toggleStartingTile = (row, col) => {
    const newGrid = startingGrid.map((r, i) => [...r]);
    newGrid[row][col] = !newGrid[row][col];
    setStartingGrid(newGrid);
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setGridSize(newSize);
    setGrid(generateGrid(newSize));
    setStartingGrid(generateGrid(newSize));
  };

  const submitStartingGrid = () => {
    setGrid(startingGrid.map(row => [...row]));
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Lights Out</Card.Title>
        <p>Set the starting grid and then play the game.</p>
        <Form.Select value={gridSize} onChange={handleSizeChange}>
          {[...Array(6)].map((_, i) => (
            <option key={i} value={i + 3}>{`${i + 3}x${i + 3}`}</option>
          ))}
        </Form.Select>
        
        <p className="mt-3">Starting Grid:</p>
        <div className="mt-1" style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, auto)`, gap: "0px", justifyContent: "center" }}>
          {startingGrid.map((row, rIdx) =>
            row.map((isOn, cIdx) => (
              <Button
                key={`start-${rIdx}-${cIdx}`}
                variant={isOn ? "warning" : "dark"}
                onClick={() => toggleStartingTile(rIdx, cIdx)}
                style={{ width: "30px", height: "30px", padding: 0, margin: 0, borderRadius: 0 }}
              />
            ))
          )}
        </div>
        
        <Button className="mt-3" onClick={submitStartingGrid} variant="primary">Submit Starting Grid</Button>
        
        <p className="mt-3">Game Grid:</p>
        <div className="mt-1" style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, auto)`, gap: "0px", justifyContent: "center" }}>
          {grid.map((row, rIdx) =>
            row.map((isOn, cIdx) => (
              <Button
                key={`${rIdx}-${cIdx}`}
                variant={isOn ? "warning" : "dark"}
                onClick={() => toggleTile(rIdx, cIdx)}
                style={{ width: "30px", height: "30px", padding: 0, margin: 0, borderRadius: 0 }}
              />
            ))
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default LightsOut;