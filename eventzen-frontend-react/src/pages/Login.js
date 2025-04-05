import React, { useState } from 'react';
import './Auth.css';  

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:6002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Login Successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email);
        // redirect based on role
        if (data.role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/customer/dashboard';
        }
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };


  return (
    <div className="auth-container">
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/signup">Register Now</a>
      </p>
      {/* <p className="admin-link">
        Are you an admin? <a href="/admin-login">Click here</a>
      </p> */}
    </div>
  );
}

export default Login;
