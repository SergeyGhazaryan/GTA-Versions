import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const defaultOptions = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
