import axiosInstance from './axios';

export const siteApi = {
  getSites: async () => {
    // Placeholder for future endpoints
    return { success: true, data: [] };
  },
  createSite: async (siteData) => {
    return { success: true, data: siteData };
  }
};
