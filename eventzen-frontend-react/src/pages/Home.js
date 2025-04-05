// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to EventZen!</h1>
      <p className="instruction-text">Login to know about the latest events.</p>
      <p className="instruction-text">Don't have an account? Register Now.</p>

      <div className="button-group">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Register</button>
      </div>

      {/* <div className="admin-link">
        <p>
          For Admin Portal{' '}
          <span onClick={() => navigate('/admin-login')}>click here</span>.
        </p>
      </div> */}
    </div>
  );
}

export default Home;
