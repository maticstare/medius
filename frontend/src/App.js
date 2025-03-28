import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Players from "./components/Players";
import Problems from "./components/Problems";
import Solutions from "./components/Solutions";
import { Container, Nav, Navbar } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Lights Out</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/players">Players</Nav.Link>
            <Nav.Link as={Link} to="/problems">Problems</Nav.Link>
            <Nav.Link as={Link} to="/solutions">Solutions</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/players" element={<Players />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/solutions" element={<Solutions />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
