import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPlayer } from '../api/players';
import { Container, Form, Button, Card } from 'react-bootstrap';

const LoginPage = ({setUsername}) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await getPlayer(form.username);
  
      if (res.data && res.data.password === form.password) {
        setUsername(res.data.username);
        localStorage.setItem('username', form.username);
        localStorage.setItem('userId', res.data.id);
        navigate('/home');
      } else {
        alert('Invalid username or password');
      }
    } catch (err) {
      alert('User not found');
    }
  };
  

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
            <div className="mt-3">
              <Link to="/register">Don't have an account? Sign up</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
