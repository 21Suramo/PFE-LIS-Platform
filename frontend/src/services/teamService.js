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

export async function createTeam(formData) {
  const { data } = await api.post('/teams', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateTeam(id, formData) {
  const { data } = await api.put(`/teams/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteTeam(id) {
  const { data } = await api.delete(`/teams/${id}`);
  return data;
}

export async function addMemberToTeam(teamId, userId) {
  const { data } = await api.post(`/teams/${teamId}/members`, { userId });
  return data;
}

export async function removeMemberFromTeam(teamId, userId) {
  const { data } = await api.delete(`/teams/${teamId}/members/${userId}`);
  return data;
}
