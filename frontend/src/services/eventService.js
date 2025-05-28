import api from './api';

export const getEvents = () =>
  api.get('/events').then(res => res.data); 

export const createEvent = (data) =>
  api.post('/events', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data.event); 

export const deleteEvent = (id) =>
  api.delete(`/events/${id}`);

export const updateEvent = (id, data) =>
  api({
    method: 'put',
    url: `/events/${id}`,
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
