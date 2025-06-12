// src/services/eventService.js
import api from './api';

export async function getAllEvents() {
  const { data } = await api.get('/events');
  return data;
}
