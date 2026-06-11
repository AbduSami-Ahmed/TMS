// API service setup for TaskSphere
const BASE_URL = 'http://127.0.0.1:8000/api';

// Helper to get auth headers with token
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
      // Throw the response data so the component can handle validation errors
      throw data;
    }

    return data;
  },

  login: async (username, password) => {
    // TODO: implement API post request to /login/
    console.log('API login called for:', username);
  },

  logout: async () => {
    // TODO: implement API post request to /logout/
    console.log('API logout called');
  }
};

export const taskService = {
  getTasks: async () => {
    // TODO: implement API get request to /tasks/
    console.log('API getTasks called');
    return [];
  },

  createTask: async (taskData) => {
    // TODO: implement API post request to /tasks/
    console.log('API createTask called:', taskData);
  },

  updateTask: async (id, taskData) => {
    // TODO: implement API put request to /tasks/{id}/
    console.log('API updateTask called for id:', id);
  },

  deleteTask: async (id) => {
    // TODO: implement API delete request to /tasks/{id}/
    console.log('API deleteTask called for id:', id);
  }
};
