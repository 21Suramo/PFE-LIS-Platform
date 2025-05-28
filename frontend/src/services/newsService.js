// src/services/newsService.js (Verify this exists and is correct)
import api from './api';

export async function getAllActualites() {
  const { data } = await api.get('/actualites');
  return data;
}

export async function getActualiteById(id) {
  const { data } = await api.get(`/actualites/${id}`);
  return data;
}



// Use FormData for file/image upload
export async function createActualite(actualiteData) {
  return api.post('/actualites', actualiteData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
}

export async function updateActualite(id, actualiteUpdateData) {
  return api.put(`/actualites/${id}`, actualiteUpdateData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
}

export async function deleteActualite(id) {
  const { data } = await api.delete(`/actualites/${id}`);
  return data;
}