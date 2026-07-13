import { activityApi } from '../api/activityApi';

export const activityService = {
  getActivitiesByLead: async (leadId) => {
    try {
      return await activityApi.getActivitiesByLead(leadId);
    } catch (error) {
      console.error('activityService.getActivitiesByLead failed:', error);
      throw error;
    }
  },

  createActivity: async (activityData) => {
    try {
      return await activityApi.createActivity(activityData);
    } catch (error) {
      console.error('activityService.createActivity failed:', error);
      throw error;
    }
  },

  updateActivity: async (id, data) => {
    try {
      return await activityApi.updateActivity(id, data);
    } catch (error) {
      console.error('activityService.updateActivity failed:', error);
      throw error;
    }
  },

  deleteActivity: async (id) => {
    try {
      return await activityApi.deleteActivity(id);
    } catch (error) {
      console.error('activityService.deleteActivity failed:', error);
      throw error;
    }
  },

  getStaffSummary: async () => {
    try {
      return await activityApi.getStaffSummary();
    } catch (error) {
      console.error('activityService.getStaffSummary failed:', error);
      throw error;
    }
  }
};
