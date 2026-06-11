import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import { authService } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setCurrentView('tasks');
    } else {
      setCurrentView('login');
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setToken(null);
  };

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ padding: '15px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
        <h1 style={{ margin: 0, fontSize: '22px', cursor: 'pointer', color: '#333' }} onClick={() => setCurrentView(token ? 'tasks' : 'login')}>
          TaskSphere
        </h1>
        <div>
          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '14px', color: '#555' }}>
                Hello, <strong>{localStorage.getItem('username')}</strong>
              </span>
              <button 
                onClick={() => setCurrentView('tasks')} 
                style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '3px' }}
              >
                Tasks
              </button>
              <button 
                onClick={handleLogout} 
                style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#6C757D', color: 'white', border: 'none', borderRadius: '3px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ gap: '10px', display: 'flex' }}>
              <button 
                onClick={() => setCurrentView('login')} 
                style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '3px' }}
              >
                Login
              </button>
              <button 
                onClick={() => setCurrentView('register')} 
                style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '3px' }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>

      <main style={{ padding: '20px' }}>
        {currentView === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
        {currentView === 'register' && <Register />}
        {currentView === 'tasks' && <Tasks />}
      </main>
    </div>
  );
}

export default App;
