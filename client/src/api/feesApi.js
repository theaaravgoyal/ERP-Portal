import axiosInstance from './axios';

export const feesApi = {
  getBalances: async () => {
    // Placeholder for future endpoints
    return { success: true, data: [] };
  },
  recordPayment: async (paymentData) => {
    return { success: true, data: paymentData };
  }
};
