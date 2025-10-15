import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Overlay CRUD operations
export const createOverlay = async (overlayData) => {
  const response = await api.post('/overlays', overlayData);
  return response.data;
};

export const getAllOverlays = async (userId = null) => {
  const params = userId ? { user_id: userId } : {};
  const response = await api.get('/overlays', { params });
  return response.data;
};

export const getOverlay = async (id) => {
  const response = await api.get(`/overlays/${id}`);
  return response.data;
};

export const updateOverlay = async (id, updates) => {
  const response = await api.put(`/overlays/${id}`, updates);
  return response.data;
};

export const deleteOverlay = async (id) => {
  const response = await api.delete(`/overlays/${id}`);
  return response.data;
};

// Stream operations
export const startStream = async (rtspUrl) => {
  const response = await api.post('/stream/start', { rtsp_url: rtspUrl });
  return response.data;
};

export const stopStream = async () => {
  const response = await api.post('/stream/stop');
  return response.data;
};

export const getStreamStatus = async () => {
  const response = await api.get('/stream/status');
  return response.data;
};

export default api;