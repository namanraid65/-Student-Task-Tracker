import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const getTasks = (params) => {
  return api.get('/tasks', { params });
};

export const createTask = (taskData) => {
  return api.post('/tasks', taskData);
};

export const updateTask = (id, taskData) => {
  return api.put(`/tasks/${id}`, taskData);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export const getStats = () => {
  return api.get('/tasks/stats');
};

export default api;
