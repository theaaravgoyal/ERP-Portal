import { leadApi } from '../api/leadApi';

export const leadService = {
  getLeads: async () => {
    try {
      const response = await leadApi.getLeads();
      return response.data || [];
    } catch (error) {
      console.error('leadService.getLeads failed:', error);
      throw error;
    }
  },

  updateLeadStatus: async (leadId, status) => {
    try {
      const response = await leadApi.updateLeadStatus(leadId, status);
      return response.data;
    } catch (error) {
      console.error('leadService.updateLeadStatus failed:', error);
      throw error;
    }
  },

  deleteLead: async (leadId) => {
    try {
      const response = await leadApi.deleteLead(leadId);
      return response.success;
    } catch (error) {
      console.error('leadService.deleteLead failed:', error);
      throw error;
    }
  },

  createLead: async (leadData) => {
    try {
      const response = await leadApi.createLead(leadData);
      return response.data;
    } catch (error) {
      console.error('leadService.createLead failed:', error);
      throw error;
    }
  }
};
