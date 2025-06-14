import api from './api';

export async function loginUser(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  return data;
}

export async function registerUser(details) {
  const { data } = await api.post('/auth/register', details);
  return data;
}

export async function resetPassword(email) {
    const { data } = await api.post('/auth/reset-password', { email });
    return data;
  }