import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const generateTestCases = async (data, promptPath, model, temperature) => {
  const response = await axios.post(`${API_URL}/generate`, {
    tickets: data.tickets,
    prompt_path: promptPath,
    model: model,
    temperature: temperature
  });
  return response.data.results;
};