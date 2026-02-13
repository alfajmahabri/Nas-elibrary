import React, { useState, useEffect } from 'react'; // Reintroduce useEffect
import { useNavigate } from 'react-router-dom'; // Use useNavigate
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css'; // Use AdminLogin.css

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, isAuthenticated } = useAuth(); // No need for isAdminUser here for redirect
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Always redirect to /home after any successful login from this form
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/v1/auth/login', { // Assuming same login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Error responses might still be JSON
        throw new Error(errorData.message || 'Admin Login failed');
      }

      const token = await response.text(); // Read raw token as text
      login(token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;