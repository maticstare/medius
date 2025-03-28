import { useState, useEffect } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";

const API_URL = "http://localhost:8080";

function Solutions() {
  const [solutions, setSolutions] = useState([]);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/solutions`)
      .then(res => res.json())
      .then(data => setSolutions(data));
  }, []);

  const submitSolution = () => {
    fetch(`${API_URL}/solutions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ steps: solution })
    }).then(() => {
      setSolution("");
      setSolutions([...solutions, { steps: solution }]);
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Solutions</Card.Title>
        <ListGroup className="mb-3">
          {solutions.map((s, index) => (
            <ListGroup.Item key={index}>{s.steps}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Control
          type="text"
          placeholder="New solution"
          value={solution}
          onChange={e => setSolution(e.target.value)}
          className="mb-2"
        />
        <Button onClick={submitSolution}>Submit Solution</Button>
      </Card.Body>
    </Card>
  );
}

export default Solutions;
