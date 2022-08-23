import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://shikin-links.tk/api/',
  // baseURL: 'http://127.0.0.1:5000/',
  withCredentials: true,
  credentials: 'include',
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = Cookies.get('Authentication');
    const auth = token ? `Bearer ${token}` : '';
    const refresh = Cookies.get('Refresh');

    config.headers.common['Authorization'] = auth;
    config.headers.common['Refresh'] = refresh;

    return config;
  },
  error => Promise.reject(error)
);

export default api;
