// src/services/userService.js
import api from './api';

// Register a new user (used by Directeur)
export const createUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

// Get all users (for dropdowns, dashboard, etc.)
export async function getAllUsers() {
  const { data } = await api.get('/users'); // Or update this path if different
  return data;
}

// Get one user by ID
export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

// Update user by ID
export const updateUser = async (user) => {
  const { data } = await api.put(`/users/${user._id}`, user);
  return data;
};

// Delete user by ID
export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
