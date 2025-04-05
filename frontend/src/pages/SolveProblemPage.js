import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import TopNavbar from '../components/Shared/Navbar';
import LightsOutGrid from '../components/Game/LightsOutGrid';
import { getAllProblems, getProblem } from '../api/problems';
import { createSolution } from '../api/solutions';
import { createSolutionStep } from '../api/solution_steps';

const SolveProblemPage = () => {
  const [problems, setProblems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(3);
  const [message, setMessage] = useState(null);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [steps, setSteps] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getAllProblems().then((res) => {
      setProblems(res.data);
    });
  }, []);

  const handleProblemSelect = async (e) => {
    const id = e.target.value;
    setSelectedId(id);

    if (!id) {
      setGrid([]);
      setGridSize(3);
      setSolutionGrid([]);
      setMessage(null);
      return;
    }

    const res = await getProblem(id);
  
    const flatGrid = res.data.description.split('').map((tile) => tile === '1');
    const size = Math.sqrt(flatGrid.length);
  
    const problemGrid = [];
    for (let i = 0; i < size; i++) {
      problemGrid.push(flatGrid.slice(i * size, (i + 1) * size));
    }
  
    setGrid(problemGrid);
    setGridSize(size);
    setSolutionGrid(problemGrid.map((row) => row.map(() => 0)));
    setSteps([]);
    setMessage(null);
  };
  

  const toggleTile = (r, c) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    const toggle = (i, j) => {
      if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
        newGrid[i][j] = !newGrid[i][j];
      }
    };
    toggle(r, c);
    toggle(r - 1, c);
    toggle(r + 1, c);
    toggle(r, c - 1);
    toggle(r, c + 1);
    setGrid(newGrid);
    solutionGrid[r][c] = solutionGrid[r][c] === 0 ? 1 : 0;
    setSolutionGrid([...solutionGrid]);
    
    setSteps((prevSteps) => [...prevSteps, {r, c}]);
  };

  const handleSubmitSolution = async () => {
    const flatGrid = grid.flat().map((tile) => (tile ? 1 : 0)).join('');
    const flatSolutionGrid = solutionGrid.flat().map((tile) => (tile ? 1 : 0)).join('');

    if (flatGrid.includes('0')) {
      setMessage({ text: 'Incorrect solution.', type: 'danger' });
    }else {
      const solution = {
        problem: { id: selectedId },
        solver: { id: userId },
        solution: flatSolutionGrid,
      };
      try {
        const createdSolution = await createSolution(solution);
        setMessage({ text: 'Solution accepted!', type: 'success' });

        // post solution steps to the server
        for (const [index, step] of steps.entries()) {
          await createSolutionStep({
            solution: { id: createdSolution.data.id },
            moveX: step.r,
            moveY: step.c,
            stepOrder: index + 1,
          });
        }
        
        setMessage({ text: 'Solution steps saved successfully!', type: 'success' });

      } catch {
        setMessage({ text: 'Correct solution but database error.', type: 'danger' });
      }
    }
    
  };

  return (
    <>
      <TopNavbar />
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Solve a Problem</Card.Title>

            <Form.Group className="mb-3 mt-3">
              <Form.Label>Select a Problem</Form.Label>
              <Form.Select onChange={handleProblemSelect}>
                <option value="">-- Choose a problem --</option>
                {problems.map((p) => (
                  <option key={p.id} value={p.id}>
                    Problem #{p.id}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {grid.length > 0 && (
              <>
                <LightsOutGrid grid={grid} toggleTile={toggleTile} gridSize={gridSize} />
                <Button variant="success" onClick={handleSubmitSolution}>
                  Submit Solution
                </Button>
              </>
            )}

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

export default SolveProblemPage;
