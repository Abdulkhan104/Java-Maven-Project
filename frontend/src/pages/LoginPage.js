import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo login - In production, call your backend API
    if (email === 'admin@veecart.com' && password === 'admin123') {
      const user = { id: 1, fullName: 'Admin User', email, role: 'ADMIN' };
      localStorage.setItem('veecart_user', JSON.stringify(user));
      setUser(user);
      navigate('/admin');
    } else if (email === 'demo@veecart.com' && password === 'demo123') {
      const user = { id: 2, fullName: 'Demo User', email, role: 'USER' };
      localStorage.setItem('veecart_user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } else {
      setError('Invalid email or password. Try: demo@veecart.com / demo123');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="logo">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">Vee<span className="logo-highlight">Cart</span></span>
            </div>
            <h2>Welcome Back!</h2>
            <p>Login to your account</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="demo-credentials">
            <p>Demo Credentials:</p>
            <p>Admin: admin@veecart.com / admin123</p>
            <p>User: demo@veecart.com / demo123</p>
          </div>

          <div className="register-link">
            Don't have an account? <Link to="/register">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;