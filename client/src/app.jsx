import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import MovieList from './pages/MovieList';
import NavBar from './components/NavBar';  // Correctly import the path by modifying it.
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return token && username ? { token, username } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <NavBar user={user} handleLogout={handleLogout} /> {/* Add Navigation Bar */}
        <div className="container mt-4 text-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/movie-list" element={<MovieList />} />
          </Routes>
        </div>
        <nav className="navbar fixed-bottom navbar-light bg-light">
          <div className="container">
            <span className="navbar-text mx-auto">
              &copy; 2024 Gazette Computing Co.
            </span>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;