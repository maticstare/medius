import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import LightsOutGrid from '../components/Game/LightsOutGrid';
import { createProblem } from '../api/problems';
import TopNavbar from '../components/Shared/Navbar';
import { solveBoard } from '../api/solver';

const CreateProblemPage = () => {
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState(createEmptyGrid(3));
  const [message, setMessage] = useState(null);

  function createEmptyGrid(size) {
    return Array(size)
      .fill(0)
      .map(() => Array(size).fill(false));
  }

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setGridSize(size);
    setGrid(createEmptyGrid(size));
  };

  const toggleTile = (r, c) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((tile, colIndex) =>
        rowIndex === r && colIndex === c ? !tile : tile
      )
    );
    setGrid(newGrid);
  };

  const handleSubmit = async () => {
    const flatGrid = grid.flat().map((tile) => (tile ? 1 : 0)).join('');
    const userId = localStorage.getItem('userId');

    try {
      const data = await solveBoard(flatGrid);
      setMessage(null);

      const isSolvable = data && data.solutionFound;
      if (!isSolvable) {
        setMessage({ text: 'Problem not solvable.', type: 'danger' });
        return;
      }

      await createProblem({
        description: flatGrid,
        createdBy: { id: userId },
      });
      setMessage({ text: 'Problem created successfully!', type: 'success' });
    } catch (err) {
      console.error('Error:', err);
      setMessage({ text: 'An error occurred. Please try again.', type: 'danger' });
    }
  };

  return (
    <>
      <TopNavbar />
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Create a New Lights Out Problem</Card.Title>

            <Form.Group className="mb-3 mt-3">
              <Form.Label>Select Grid Size</Form.Label>
              <Form.Select value={gridSize} onChange={handleGridSizeChange}>
                {[...Array(6)].map((_, i) => (
                  <option key={i + 3} value={i + 3}>
                    {i + 3}x{i + 3}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <LightsOutGrid grid={grid} toggleTile={toggleTile} gridSize={gridSize} />

            <Button variant="primary" onClick={handleSubmit}>
              Submit Problem
            </Button>

            {message && (
              <Alert variant={message.type} className="mt-3">
                {message.text}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CreateProblemPage;
