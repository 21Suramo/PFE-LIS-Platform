// src/services/articleService.js
import api from './api';

export async function getAllArticles() {
  const { data } = await api.get('/articles');
  return data;
}

export async function getArticlesByTeam(teamId) {
  const { data } = await api.get(`/articles/team/${teamId}`);
  return data;
}

export async function getArticleById(id) {
  const { data } = await api.get(`/articles/${id}`);
  return data;
}


export async function createArticle(article) {
  const isFormData = article instanceof FormData;
  const { data } = await api.post('/articles', article, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data;
}

export async function updateArticle(id, article) {
  const isFormData = article instanceof FormData;
  const { data } = await api.put(`/articles/${id}`, article, {
    headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return data;
}

export async function approveArticle(id) {
  const { data } = await api.put(`/articles/${id}/approve`);
  return data;
}

export async function returnArticleToPending(id) {
  const { data } = await api.put(`/articles/${id}/pending`);
  return data;
}

export async function deleteArticle(id) {
  const { data } = await api.delete(`/articles/${id}`);
  return data;
}

