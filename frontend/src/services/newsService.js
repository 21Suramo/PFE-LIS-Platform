// src/services/newsService.js
import api from './api';

export async function getAllNews() {
  const { data } = await api.get('/actualites');
  return data;
}

export async function createNews(formData) {
  const { data } = await api.post('/actualites', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateNews(id, formData) {
  const { data } = await api.put(`/actualites/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteNews(id) {
  const { data } = await api.delete(`/actualites/${id}`);
  return data;
}