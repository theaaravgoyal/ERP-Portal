import { useState, useEffect, useCallback } from 'react';
import { activityService } from '../services/activityService';

export const useActivities = (leadId) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffSummary, setStaffSummary] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const fetchActivities = useCallback(async () => {
    if (!leadId) {
      setActivities([]);
      return;
    }
    try {
      setLoading(true);
      const data = await activityService.getActivitiesByLead(leadId);
      setActivities(data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  const fetchStaffSummary = useCallback(async () => {
    try {
      setSummaryLoading(true);
      const summary = await activityService.getStaffSummary();
      setStaffSummary(summary);
    } catch (error) {
      console.error('Failed to fetch staff summary:', error);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    fetchStaffSummary();
  }, [fetchStaffSummary]);

  const addActivity = async (activityData) => {
    try {
      const newActivity = await activityService.createActivity({
        leadId,
        ...activityData
      });
      setActivities((prev) => [newActivity, ...prev]);
      fetchStaffSummary();
      return newActivity;
    } catch (error) {
      console.error('Failed to add activity:', error);
      throw error;
    }
  };

  const updateActivity = async (activityId, updatedData) => {
    try {
      const updated = await activityService.updateActivity(activityId, updatedData);
      setActivities((prev) =>
        prev.map((a) => (a._id === activityId || a.id === activityId ? { ...a, ...updated } : a))
      );
      fetchStaffSummary();
      return updated;
    } catch (error) {
      console.error('Failed to update activity:', error);
      throw error;
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const success = await activityService.deleteActivity(activityId);
      if (success) {
        setActivities((prev) => prev.filter((a) => a._id !== activityId && a.id !== activityId));
        fetchStaffSummary();
      }
      return success;
    } catch (error) {
      console.error('Failed to delete activity:', error);
      throw error;
    }
  };

  return {
    activities,
    loading,
    staffSummary,
    summaryLoading,
    addActivity,
    updateActivity,
    deleteActivity,
    refreshActivities: fetchActivities,
    refreshStaffSummary: fetchStaffSummary
  };
};
