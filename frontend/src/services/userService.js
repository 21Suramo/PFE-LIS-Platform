import api from './api';

export async function getAllUsers() {
  const { data } = await api.get('/users');
  return data;
}

export async function createUser(user) {
  // const { data } = await api.post('/users/create', user);
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  const { data } = await api.post('/users/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateUser(id, user) {
  // const { data } = await api.put(`/users/${id}`, user);
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  const { data } = await api.put(`/users/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}