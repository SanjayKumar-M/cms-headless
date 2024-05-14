import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/entities';

export const createEntity = async (entityName, attributes) => {
  const response = await axios.post(`${API_BASE_URL}/create`, { entityName, attributes });
  return response.data;
};

export const readEntities = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

export const createEntry = async (entityName, entry) => {
  const response = await axios.post(`${API_BASE_URL}/entry`, { entityName, entry });
  return response.data;
};

export const readEntries = async (entityName) => {
  const response = await axios.get(`${API_BASE_URL}/${entityName}`);
  return response.data;
};

export const updateEntry = async (entityName, entryId, updatedEntry) => {
  const response = await axios.put(`${API_BASE_URL}/${entityName}/${entryId}`, updatedEntry);
  return response.data;
};

export const deleteEntry = async (entityName, entryId) => {
  const response = await axios.delete(`${API_BASE_URL}/${entityName}/${entryId}`);
  return response.data;
};