// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
// Remove mock data import if any related to users for auth
// import { mockUtilisateurs } from "../data/mockData"; // Remove this
import api from '../services/api'; // Your configured axios instance

const AuthContext = createContext({
  user: null,
  token: null, // Added to store token if needed directly in context
  loading: true, // Start with loading true to check for persisted session
  login: async () => {},
  logout: () => {},
  register: async () => {} // Optional: if you have registration
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token")); // Load token from localStorage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Set token for all subsequent api requests
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    // No setLoading(true) here, LoginModal will handle its own loading state
    try {
      const response = await api.post('/auth/login', { email, password }); // Backend endpoint
      const { token: receivedToken, user: userData } = response.data;

      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user object
      api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
      
      setToken(receivedToken);
      setUser(userData);
      // No setLoading(false) here, as it's managed by the component calling login
    } catch (error) {
      // Clear any potentially stale auth state on login failure
      logout(); // Or just clear local storage and headers
      console.error("Login failed:", error.response ? error.response.data : error.message);
      throw error; // Re-throw to be caught by the LoginModal component
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    // Optionally redirect to home page or login page
    // window.location.href = '/';
  };

  // Optional: Implement register function
  const register = async (userData) => {
    // userData would include { name, email, password, role?, avatar?, speciality? }
    // The 'name' in userData.name should be mapped to 'nom' if backend authControl.registerUser expects 'nom'
    // and your user model uses 'nom'.
    // Your authControl.js for registerUser maps `req.body.name` to `nom: name`.
    try {
      const response = await api.post('/auth/register', userData);
      const { token: receivedToken, user: newUser } = response.data; // Assuming register also returns token and user

      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
      
      setToken(receivedToken);
      setUser(newUser);
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      throw error;
    }
  };


  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}