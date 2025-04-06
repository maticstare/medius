import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreateProblemPage from './pages/CreateProblemPage';
import SolveProblemPage from './pages/SolveProblemPage';

const App = () => {
  const [username, setUsername] = React.useState(localStorage.getItem('username'));


  return (
    <Router>
      <Routes>
        <Route path="/" element={username ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setUsername={setUsername} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={username ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/create" element={<CreateProblemPage />} />
        <Route path="/solve" element={<SolveProblemPage />} />
      </Routes>
    </Router>
  );
};

export default App;
