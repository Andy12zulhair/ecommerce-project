// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { api } from '../services/api';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.password2) {
      setError('Password words do not match.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.register(formData);
      setLoading(false);
      setSuccess(data.message || 'Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (errorData.username) setError(errorData.username[0]);
        else if (errorData.email) setError(errorData.email[0]);
        else if (errorData.password) setError(errorData.password[0]);
        else setError(`Error ${err.response.status}: ${JSON.stringify(errorData)}`);
      } else if (err.response) {
         setError(`Error ${err.response.status}: ${err.response.statusText}`);
      } else {
        setError(`Network Error: ${err.message}. Is Backend running?`);
      }
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
          <div className="mb-4" style={{ fontSize: '4rem', color: 'var(--color-accent)' }}>
            🚀
          </div>
          <h1 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '2px' }}>
            JOIN THE FUTURE
          </h1>
          <p className="lead mono" style={{ fontSize: '1rem', color: '#ccc' }}>
            Create your MAROS ID and unlock exclusive tech deals.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="auth-right">
        <div style={{ width: '100%', maxWidth: '400px' }}>



          <h3 className="auth-header mb-2 mt-5">Create Account</h3>
          <p className="auth-sub mb-4">Start your journey with us</p>

          {error && <Alert variant="danger" className="rounded-0">{error}</Alert>}
          {success && <Alert variant="success" className="rounded-0 text-dark" style={{ backgroundColor: 'var(--color-accent)' }}>{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                type="text" name="username"
                className="form-control-dark"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email" name="email"
                className="form-control-dark"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password" name="password"
                className="form-control-dark"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword2">
              <Form.Control
                type="password" name="password2"
                className="form-control-dark"
                placeholder="Confirm Password"
                value={formData.password2}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 btn-auth mb-3"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Form>

          <p className="text-center mt-3 text-muted small">
            Already have an account? <Link to="/login" className="auth-link">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;