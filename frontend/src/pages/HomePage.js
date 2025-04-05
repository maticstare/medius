import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import TopNavbar from '../components/Shared/Navbar';

const HomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  return (
    <>
      <TopNavbar />
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Welcome, {username} 👋</Card.Title>
            <p>Select an option below to get started:</p>
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="primary"
                className="w-50 me-2"
                onClick={() => navigate('/create')}
              >
                ➕ Create a Problem
              </Button>
              <Button
                variant="success"
                className="w-50 ms-2"
                onClick={() => navigate('/solve')}
              >
                🧩 Solve a Problem
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default HomePage;
