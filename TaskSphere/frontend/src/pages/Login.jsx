import React, { useState } from 'react';
import { authService } from '../services/api';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const data = await authService.login(username, password);
      if (onLoginSuccess) {
        onLoginSuccess(data.token);
      }
    } catch (err) {
      if (typeof err === 'object') {
        setErrors(err);
      } else {
        setErrors({ general: 'Failed to connect to the server.' });
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Login to TaskSphere</h2>

      {errors.non_field_errors && (
        <div style={{ padding: '10px', backgroundColor: '#F8D7DA', color: '#721C24', borderRadius: '3px', marginBottom: '15px' }}>
          {errors.non_field_errors}
        </div>
      )}

      {errors.general && (
        <div style={{ padding: '10px', backgroundColor: '#F8D7DA', color: '#721C24', borderRadius: '3px', marginBottom: '15px' }}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
          {errors.username && <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.username}</span>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
          {errors.password && <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.password}</span>}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
