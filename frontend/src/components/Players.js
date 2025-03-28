import { useState, useEffect } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";

const API_URL = "http://localhost:8080";

function Players() {
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/players`)
      .then(res => res.json())
      .then(data => setPlayers(data));
  }, []);

  const addPlayer = () => {
    fetch(`${API_URL}/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    }).then(() => {
      setUsername("");
      setPlayers([...players, { username }]);
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Players</Card.Title>
        <ListGroup className="mb-3">
          {players.map((p, index) => (
            <ListGroup.Item key={index}>{p.username}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-2"
        />
        <Button onClick={addPlayer}>Add Player</Button>
      </Card.Body>
    </Card>
  );
}

export default Players;
