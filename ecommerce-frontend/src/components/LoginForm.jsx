// components/LoginForm.jsx
import React, { useState } from 'react';
import { api } from '../services/api';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../pages/Auth.css'; // Global Auth Styles
import { Github, Google } from 'react-bootstrap-icons';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' }); // KOSONGKAN DEFAULTNYA
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      console.log("Attempting login with:", formData.username); // Debugging
      const { data } = await api.login(formData);
      console.log("Login success, token:", data.access); // Debugging
      localStorage.setItem('token', data.access);
      onLogin(); // Update state di App.jsx
    } catch (err) {
      console.error("Login Error:", err);
      // Tampilkan pesan error spesifik dari backend jika ada
      if (err.response && err.response.data && err.response.data.detail) {
        setError(`Login Gagal: ${err.response.data.detail}`);
      } else if (err.response) {
        // Fallback debug: Tampilkan status dan data raw
        setError(`Error ${err.response.status}: ${JSON.stringify(err.response.data)}`);
      } else {
        setError(`Network/CORS Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE - VISUALS */}
      <div className="auth-left">
        <div className="auth-slogan-box">
          {/* Simple Icon (Replaces Coffee) */}
          <div className="mb-4" style={{ fontSize: '4rem', color: 'var(--color-accent)' }}>
            <i className="bi bi-cpu"></i> {/* Requires Bootstrap Icons, simplistic fallback if image fails */}
            ⚡
          </div>

          <h1 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '2px' }}>
            FIND THE BEST TECH
          </h1>
          <p className="lead mono" style={{ fontSize: '1rem', color: '#ccc' }}>
            Upgrade your reality with MAROS high-performance devices.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="auth-right">
        <div style={{ width: '100%', maxWidth: '400px' }}>



          <h3 className="auth-header mb-2 mt-5">Welcome Back,</h3>
          <p className="auth-sub mb-4">Please login to your account</p>

          {error && <Alert variant="danger" className="rounded-0">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formUsername">
              <Form.Label className="text-muted small">Username or Email</Form.Label>
              <Form.Control
                type="text"
                name="username"
                className="form-control-dark"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label className="text-muted small">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className="form-control-dark"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check
                type="checkbox"
                label={<span className="text-muted small">Remember me</span>}
                id="rememberMe"
                style={{ accentColor: 'var(--color-accent)' }}
              />
              <a href="#" className="auth-link small">Forgot password?</a>
            </div>

            <Button
              type="submit"
              className="w-100 btn-auth mb-4"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form>

          <div className="position-relative text-center mb-4">
            <hr style={{ borderColor: '#333' }} />
            <span className="position-absolute top-50 start-50 translate-middle px-2 text-muted small" style={{ background: '#050505' }}>or</span>
          </div>

          <Button variant="outline-light" className="w-100 social-btn mb-2">
            <Google className="me-2" /> Sign in with Google
          </Button>

          <p className="text-center mt-4 text-muted small">
            New User? <Link to="/register" className="auth-link">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;