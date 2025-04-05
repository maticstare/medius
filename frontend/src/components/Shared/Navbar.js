import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Navbar bg="light" className="mb-4">
      <Navbar.Brand className="ms-3">🧩 Lights Out</Navbar.Brand>
      <Nav className="ms-auto me-3">
        <span className="navbar-text me-3">👤 {username}</span>
        <Button variant="outline-danger" size="sm" onClick={logout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default TopNavbar;
