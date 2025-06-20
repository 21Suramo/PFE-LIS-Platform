// src/services/api.js
import axios from 'axios';

const api = axios.create({
   // backend default port (3000) used in this repository.
   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteur pour ajouter le JWT stocké
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
