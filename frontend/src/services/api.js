// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // Ensure VITE_API_URL is set in .env
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to add the JWT stored in localStorage (or from AuthContext)
// This is a fallback or can work in conjunction with AuthContext setting default header.
// AuthContext setting it directly is often more immediate.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && !config.headers.Authorization) { // Only add if not already set (e.g., by AuthContext)
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;