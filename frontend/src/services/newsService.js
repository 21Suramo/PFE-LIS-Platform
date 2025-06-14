// src/services/newsService.js
import api from './api';

export async function getAllNews() {
  const { data } = await api.get('/actualites');
  return data;
}
