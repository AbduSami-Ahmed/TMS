import React, { useState } from 'react';
import { authService } from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');

    if (password !== passwordConfirm) {
      setErrors({ password_confirm: 'Passwords do not match.' });
      return;
    }

    try {
      await authService.register(username, email, password, passwordConfirm);
      setSuccessMsg('Account created successfully! You can now log in.');
      
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
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
      <h2>Create an Account</h2>
      
      {successMsg && (
        <div style={{ padding: '10px', backgroundColor: '#D4EDDA', color: '#155724', borderRadius: '3px', marginBottom: '15px' }}>
          {successMsg}
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
          {errors.email && <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.email}</span>}
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

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
          {errors.password_confirm && <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.password_confirm}</span>}
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
