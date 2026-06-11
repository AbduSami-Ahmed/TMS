const BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Token ${token}` } : {})
  };
};

export const authService = {
  register: async (username, email, password, passwordConfirm) => {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirm: passwordConfirm
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  },

  login: async (username, password) => {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
    }

    return data;
  },

  logout: async () => {
    const response = await fetch(`${BASE_URL}/logout/`, {
      method: 'POST',
      headers: getAuthHeaders()
    });

    localStorage.removeItem('token');
    localStorage.removeItem('username');

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw data;
    }
  }
};

export const taskService = {
  getTasks: async () => {
    const response = await fetch(`${BASE_URL}/tasks/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  createTask: async (taskData) => {
    const response = await fetch(`${BASE_URL}/tasks/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  updateTask: async (id, taskData) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  },

  deleteTask: async (id) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw data;
    }
  }
};
