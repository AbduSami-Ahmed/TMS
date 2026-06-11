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
    // TODO: implement API post request to /register/
    console.log('API register called for:', username);
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
