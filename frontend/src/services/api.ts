import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/users/login/', { username, password });
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      console.log('Token stored:', response.data.access);
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = (username: string, email: string, password: string) => {
  return api.post('/users/signup/', { username, email, password });
};

export const getWorkouts = () => {
  return api.get('/workouts/');
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token used for request:', token);

    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/users/current-user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Current user response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching current user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add more API calls as needed


export default api;