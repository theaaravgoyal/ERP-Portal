import React, { useState } from 'react';
import LeadConnectionSummary from './LeadConnectionSummary';
import LeadActivityTimeline from './LeadActivityTimeline';
import ActivityModal from './ActivityModal';
import MessageModal from './MessageModal';
import { MessageSquare, Plus, ArrowLeft, Globe, Phone, Mail } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';

export default function LeadDetails({ lead, onClose, onUpdateStatus }) {
  const {
    activities,
    loading,
    addActivity,
    updateActivity,
    deleteActivity
  } = useActivities(lead._id || lead.id);

  const [activeActivityModal, setActiveActivityModal] = useState(false);
  const [activeMessageModal, setActiveMessageModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const getStatusStyle = (st) => {
    const norm = st ? st.toLowerCase() : 'new';
    switch (norm) {
      case 'new':
      case 'pending':
        return 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]';
      case 'contacted':
        return 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
      case 'follow-up':
        return 'bg-[#FAF5FF] text-[#7C3AED] border-[#E9D5FF]';
      case 'converted':
        return 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]';
      default:
        return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]';
    }
  };

  const formatSource = (src) => {
    if (!src) return 'Direct Campaign';
    let s = src.toLowerCase();
    if (s === 'popup') return 'Popup Campaign';
    if (s === 'course-page') return 'Course Page Campaign';
    if (s === 'website') return 'Website Campaign';
    if (s === 'facebook') return 'Facebook Campaign';
    if (s === 'instagram') return 'Instagram Campaign';
    if (s === 'google' || s === 'google search') return 'Google Search Campaign';
    return src.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Campaign';
  };

  const handleSaveActivity = async (data) => {
    if (editingActivity) {
      await updateActivity(editingActivity._id || editingActivity.id, data);
      setEditingActivity(null);
    } else {
      await addActivity(data);
      // Promote status to contacted if it's New
      if (lead.status === 'New' || lead.status === 'pending') {
        onUpdateStatus(lead._id || lead.id, 'Contacted');
      }
    }
  };

  const handleSendMessage = async (data) => {
    await addActivity(data);
    if (lead.status === 'New' || lead.status === 'pending') {
      onUpdateStatus(lead._id || lead.id, 'Contacted');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-650 hover:text-slate-800 transition-colors cursor-pointer bg-white border border-[#DEDCD8] px-3.5 py-2 rounded-xl hover:bg-[#FAF9F6] shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Leads Board</span>
        </button>
      </div>

      {/* Main Info Card */}
      <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E8E6E1] flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm">
        <div className="space-y-3 flex-1 min-w-0">
          <h2 className="text-lg font-black text-slate-800 tracking-tight truncate">{lead.name}</h2>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <Phone size={13} className="text-slate-400" />
              <a href={`tel:${lead.phone}`} className="hover:text-[#E31C1C] font-mono">{lead.phone}</a>
            </span>
            {lead.email && (
              <span className="flex items-center gap-1">
                <Mail size={13} className="text-slate-400" />
                <span className="truncate">{lead.email}</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <span className="inline-block px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider text-[#E31C1C] bg-[#FDF2F2] border border-[#FCD4D4] rounded-md uppercase">
                {lead.course}
              </span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Globe size={13} className="text-slate-400" />
              <span>{formatSource(lead.source)}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${getStatusStyle(lead.status)}`}>
                {lead.status || 'New'}
              </span>
            </span>
          </div>

          {lead.message && (
            <p className="p-3 bg-white border border-[#E3E1DC] rounded-xl text-xs text-slate-500 font-medium leading-relaxed max-w-2xl italic">
              "{lead.message}"
            </p>
          )}
        </div>

        {/* Buttons Panel */}
        <div className="flex items-center gap-2 md:self-start shrink-0">
          <button
            onClick={() => setActiveMessageModal(true)}
            className="px-4 py-2.5 bg-white border border-[#DEDCD8] hover:bg-[#FAF9F6] rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <MessageSquare size={13} className="text-slate-550" />
            <span>WhatsApp Template</span>
          </button>
          <button
            onClick={() => setActiveActivityModal(true)}
            className="px-4 py-2.5 bg-[#E31C1C] hover:bg-[#b81414] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-sm"
          >
            <Plus size={13} />
            <span>Log Call Activity</span>
          </button>
        </div>
      </div>

      {/* Loading Timeline spinner */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 bg-white border border-[#E8E6E1] rounded-2xl shadow-sm">
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#E31C1C] animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading activity logs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Timeline - Left (span-2) */}
          <div className="lg:col-span-2 space-y-6">
            <LeadActivityTimeline
              activities={activities}
              onEdit={(act) => {
                setEditingActivity(act);
                setActiveActivityModal(true);
              }}
              onDelete={deleteActivity}
            />
          </div>

          {/* Connection Summary - Right */}
          <div>
            <LeadConnectionSummary activities={activities} />
          </div>
        </div>
      )}

      {/* Activity Modals */}
      {activeActivityModal && (
        <ActivityModal
          lead={lead}
          activity={editingActivity}
          connectedActivities={activities.filter(a => a.callStatus === "Connected" || a.callStatus === "Message Sent")}
          onClose={() => {
            setActiveActivityModal(false);
            setEditingActivity(null);
          }}
          onSave={handleSaveActivity}
        />
      )}

      {activeMessageModal && (
        <MessageModal
          lead={lead}
          onClose={() => setActiveMessageModal(false)}
          onSave={handleSendMessage}
        />
      )}
    </div>
  );
}
