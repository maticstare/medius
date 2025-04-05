import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPlayer } from '../api/players';
import { Container, Form, Button, Card } from 'react-bootstrap';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    try {
      await createPlayer(form);
      alert('Account created!');
      navigate('/login');
    } catch {
      alert('Error creating user (maybe username taken)');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="age" name="age" onChange={handleChange} />
            </Form.Group>
            <Button variant="success" onClick={handleSignup}>Sign Up</Button>
            <div className="mt-3">
              <Link to="/login">Already have an account? Log in</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
