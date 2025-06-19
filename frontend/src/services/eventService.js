// src/services/eventService.js
import api from './api';

export async function getAllEvents() {
  const { data } = await api.get('/events');
  return data;
}

export async function createEvent(formData) {
  const { data } = await api.post('/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateEvent(id, formData) {
  const { data } = await api.put(`/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteEvent(id) {
  const { data } = await api.delete(`/events/${id}`);
  return data;
}