// src/services/articleService.js
import api from './api';

export async function getAllArticles() {
  const { data } = await api.get('/articles');
  return data;
}

export async function getArticleById(id) {
  const { data } = await api.get(`/articles/${id}`);
  return data;
}

export async function createArticle(article) {
  const { data } = await api.post('/articles', article);
  return data;
}

export async function updateArticle(article) {
  const { data } = await api.put(`/articles/${article._id}`, article);
  return data;
}

export async function deleteArticle(id) {
  const { data } = await api.delete(`/articles/${id}`);
  return data;
}
