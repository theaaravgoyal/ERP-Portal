import axios from 'axios';

const leadAxios = axios.create({
  baseURL: 'https://api.jainscomputer.com/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Attach JWT Token automatically just like the global axios instance
leadAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const leadApi = {
  getLeads: async () => {
    const response = await leadAxios.get('/lead');
    return response.data;
  },

  updateLeadStatus: async (leadId, status) => {
    const response = await leadAxios.put(`/lead/${leadId}`, { status });
    return response.data;
  },

  deleteLead: async (leadId) => {
    const response = await leadAxios.delete(`/lead/${leadId}`);
    return response.data;
  },

  createLead: async (leadData) => {
    const response = await leadAxios.post('/lead', leadData);
    return response.data;
  }
};
