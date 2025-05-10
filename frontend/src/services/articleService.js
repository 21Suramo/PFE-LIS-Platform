// src/services/articleService.js
import api from './api';

export async function getAllArticles() {
  const { data } = await api.get('/articles');
  return data;
}

export async function createArticle(article) {
  const { data } = await api.post('/articles', article);
  return data;
}
