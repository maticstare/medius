import { useState, useEffect } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";

const API_URL = "http://localhost:8080";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/problems`)
      .then(res => res.json())
      .then(data => setProblems(data));
  }, []);

  const addProblem = () => {
    fetch(`${API_URL}/problems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newProblem })
    }).then(() => {
      setNewProblem("");
      setProblems([...problems, { description: newProblem }]);
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Problems</Card.Title>
        <ListGroup className="mb-3">
          {problems.map((p, index) => (
            <ListGroup.Item key={index}>{p.description}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Control
          type="text"
          placeholder="New problem"
          value={newProblem}
          onChange={e => setNewProblem(e.target.value)}
          className="mb-2"
        />
        <Button onClick={addProblem}>Add Problem</Button>
      </Card.Body>
    </Card>
  );
}

export default Problems;
