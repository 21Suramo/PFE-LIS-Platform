// src/services/teamService.js
import api from './api';

export async function getAllTeams() {
  const { data } = await api.get('/teams');
  return data;
}

export async function getTeamById(id) {
  const { data } = await api.get(`/teams/${id}`);
  return data;
}
