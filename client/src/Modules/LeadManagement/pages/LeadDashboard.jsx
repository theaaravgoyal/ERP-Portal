import React, { useState, useMemo } from 'react';
import Card from '../../../components/Card';
import { useLeads } from '../hooks/useLeads';
import { useActivities } from '../hooks/useActivities';
import { useLeadFilters } from '../hooks/useLeadFilters';
import LeadStats from '../components/LeadStats';
import LeadSearch from '../components/LeadSearch';
import LeadFilters from '../components/LeadFilters';
import LeadTable from '../components/LeadTable';
import LeadDetails from '../components/LeadDetails';
import ActivityModal from '../components/ActivityModal';
import MessageModal from '../components/MessageModal';
import { RefreshCw, PlusCircle, Bell, Zap, MoreVertical } from 'lucide-react';

export default function LeadDashboard() {
  const {
    leads,
    loading,
    error,
    countdown,
    refreshLeads,
    handleManualRefresh,
    updateLeadStatus,
    deleteLead,
    createLead
  } = useLeads();

  const {
    staffSummary,
    addActivity,
    refreshStaffSummary
  } = useActivities();

  // Selected lead for full details view
  const [selectedLead, setSelectedLead] = useState(null);

  // Active tab state
  const [activeTab, setActiveTab] = useState('online');

  // Filters State Hook
  const {
    searchQuery,
    setSearchQuery,
    activeStatusFilter,
    setActiveStatusFilter,
    selectedCourse,
    setSelectedCourse,
    selectedSource,
    setSelectedSource,
    selectedAssignment,
    setSelectedAssignment,
    sortBy,
    setSortBy,
    filteredLeads,
    clearFilters,
    isFiltered,
    latestActivitiesMap
  } = useLeadFilters(leads, staffSummary);

  // States for row action overlays
  const [rowActionLead, setRowActionLead] = useState(null);
  const [activeCallModal, setActiveCallModal] = useState(false);
  const [activeMessageModal, setActiveMessageModal] = useState(false);

  // Map of lead ID to list of staff members engaged
  const connectedLeadsMap = useMemo(() => {
    const map = {};
    if (staffSummary) {
      staffSummary.forEach((item) => {
        if (item.leadId && (item.callStatus === 'Connected' || item.callStatus === 'Message Sent')) {
          if (!map[item.leadId]) {
            map[item.leadId] = [];
          }
          if (!map[item.leadId].includes(item.staffName)) {
            map[item.leadId].push(item.staffName);
          }
        }
      });
    }
    return map;
  }, [staffSummary]);

  // Compute status cards metrics
  const statsCounts = useMemo(() => {
    const counts = {
      New: 0,
      Contacted: 0,
      'Follow-up': 0,
      Converted: 0,
      'Not Interested': 0,
    };
    leads.forEach((l) => {
      const status = l.status || 'New';
      if (counts[status] !== undefined) {
        counts[status] += 1;
      } else {
        const norm = status.toLowerCase();
        if (norm === 'pending' || norm === 'new') {
          counts.New += 1;
        } else if (norm === 'contacted') {
          counts.Contacted += 1;
        } else if (norm === 'converted') {
          counts.Converted += 1;
        } else if (norm === 'follow-up' || norm === 'followup') {
          counts['Follow-up'] += 1;
        } else {
          counts['Not Interested'] += 1;
        }
      }
    });
    return counts;
  }, [leads]);

  // Simulator
  const handleSimulateWebsiteInquiry = async () => {
    const names = [
      'Gaurav Singhal', 'Mehak Goyal', 'Rohan Bhatia', 'Tanmay Sharma', 
      'Palak Dwivedi', 'Kshitiz Kapoor', 'Aditi Verma', 'Yash Mittal'
    ];
    const phones = [
      '9811223344', '9560403020', '8877665544', '9910203040', 
      '8130405060', '9899112233', '9654123456', '7042556677'
    ];
    const emails = [
      'gaurav.s@gmail.com', 'mehak.g@gmail.com', 'rohan.b@gmail.com', 'tanmay.sh@gmail.com',
      'palak.d@gmail.com', 'kshitiz.k@gmail.com', 'aditi.v@gmail.com', 'yash.m@gmail.com'
    ];
    const COURSES = [
      'Python Programming',
      'Web Development',
      'Graphic Design',
      'Digital Marketing',
      'Tally & GST',
      'Video Editing',
      'Data Analytics',
      'C++ & Java Masterclass'
    ];
    const SOURCES = [
      'Website',
      'Course Page',
      'Facebook',
      'Instagram',
      'Popup',
      'Google Search'
    ];

    const randomIndex = Math.floor(Math.random() * names.length);
    const randomCourse = COURSES[Math.floor(Math.random() * COURSES.length)];
    const randomSource = SOURCES[Math.floor(Math.random() * SOURCES.length)];

    const leadData = {
      name: names[randomIndex],
      phone: phones[randomIndex],
      email: emails[randomIndex],
      course: randomCourse,
      source: randomSource,
      message: `Simulated website inquiry request for ${randomCourse}.`,
      status: 'New'
    };

    try {
      const created = await createLead(leadData);
      setSelectedLead(created);
      refreshLeads();
      refreshStaffSummary();
    } catch (err) {
      console.error('Failed to simulate lead:', err);
    }
  };

  const handleUpdateStatus = async (leadId, nextStatus) => {
    await updateLeadStatus(leadId, nextStatus);
    if (selectedLead && (selectedLead._id === leadId || selectedLead.id === leadId)) {
      setSelectedLead((prev) => ({ ...prev, status: nextStatus }));
    }
  };

  const handleDelete = async (leadId) => {
    await deleteLead(leadId);
    if (selectedLead && (selectedLead._id === leadId || selectedLead.id === leadId)) {
      setSelectedLead(null);
    }
  };

  const handleSaveActivityRow = async (data) => {
    if (rowActionLead) {
      await addActivity({
        leadId: rowActionLead._id || rowActionLead.id,
        ...data
      });
      if (rowActionLead.status === 'New' || rowActionLead.status === 'pending') {
        await handleUpdateStatus(rowActionLead._id || rowActionLead.id, 'Contacted');
      }
      setRowActionLead(null);
      refreshStaffSummary();
    }
  };

  return (
    <div className="bg-[#F9F8F6] text-slate-800 p-6 md:p-8 rounded-3xl min-h-[calc(100vh-140px)] font-sans border border-[#E8E6E1] -mx-6 md:-mx-10 -my-6 md:-my-10 flex flex-col justify-between">
      
      {/* 1. Header Area */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Leads Management</h1>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed">
              Track online inquiries, manage cycle status, follow ups, and staff assignment.
            </p>
          </div>
          
          {/* Action Tools & User Profile */}
          <div className="flex items-center gap-3 self-start md:self-center">
            <button 
              onClick={handleSimulateWebsiteInquiry}
              className="flex items-center gap-1 bg-[#E31C1C] hover:bg-[#b81414] text-white px-4 py-2 rounded-full font-bold text-xs border-0 shadow-sm transition-all cursor-pointer hover:shadow-md active:scale-95"
            >
              <span>+ Simulate Web Lead</span>
              <Zap size={12} className="fill-current text-white" />
            </button>
            
            {/* Bell notification button */}
            <button className="bg-white border border-[#DEDCD8] hover:bg-[#F0EEEA] text-slate-650 hover:text-slate-850 p-2 rounded-full transition-colors relative cursor-pointer shadow-sm w-9 h-9 flex items-center justify-center">
              <Bell size={15} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E31C1C] rounded-full" />
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#DEDCD8]">
              <div className="w-9 h-9 rounded-full bg-[#E31C1C] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-inner">
                AG
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-slate-800 text-xs font-black leading-tight">Aarav Goyal</span>
                <span className="text-[#E31C1C] text-[9px] font-black tracking-wider uppercase mt-0.5">ADMIN</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Custom Tabs */}
        <div className="flex border-b border-[#E3E1DC] gap-4">
          <button 
            onClick={() => setActiveTab('online')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'online' 
                ? 'text-[#E31C1C] border-[#E31C1C]' 
                : 'text-slate-450 border-transparent hover:text-slate-700'
            }`}
          >
            Online Leads
          </button>
          <button 
            onClick={() => setActiveTab('offline')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'offline' 
                ? 'text-[#E31C1C] border-[#E31C1C]' 
                : 'text-slate-450 border-transparent hover:text-slate-700'
            }`}
          >
            Offline Leads
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'analytics' 
                ? 'text-[#E31C1C] border-[#E31C1C]' 
                : 'text-slate-450 border-transparent hover:text-slate-700'
            }`}
          >
            Performance Analytics
          </button>
        </div>

        {/* 3. Main Content Switching */}
        {selectedLead ? (
          <div className="bg-white border border-[#E8E6E1] rounded-3xl p-6 shadow-sm">
            <LeadDetails
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
              onUpdateStatus={handleUpdateStatus}
              onDeleteLead={handleDelete}
            />
          </div>
        ) : activeTab !== 'online' ? (
          <div className="bg-white border border-[#EBEAE6] rounded-2xl p-16 text-center shadow-sm">
            <h4 className="font-extrabold text-slate-750 text-sm">Under Development</h4>
            <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              This tab is currently being simulated. Please switch back to "Online Leads" to view active website inquiries.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Stats Bar */}
            <LeadStats 
              counts={statsCounts}
              activeStatusFilter={activeStatusFilter}
              setActiveStatusFilter={setActiveStatusFilter}
            />

            {/* Filters Toolbar */}
            <div className="bg-white border border-[#E8E6E1] shadow-sm rounded-2xl p-4 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <LeadSearch query={searchQuery} setQuery={setSearchQuery} />
              <LeadFilters
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
                selectedAssignment={selectedAssignment}
                setSelectedAssignment={setSelectedAssignment}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearFilters={clearFilters}
                isFiltered={isFiltered}
              />
            </div>

            {/* Inquiries Count bar */}
            <div className="flex items-center justify-between px-1">
              <div className="text-[11px] text-slate-500 font-extrabold">
                Showing {filteredLeads.length} of {leads.length} online website inquiries
              </div>
              <div className="text-[10px] text-slate-450 font-bold hidden sm:block">
                * Click student details card or status badges to operate.
              </div>
            </div>

            {/* Leads Card Stack */}
            {loading && leads.length === 0 ? (
              <div className="py-20 text-center text-slate-450 bg-white border border-[#E8E6E1] rounded-2xl">
                <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#E31C1C] animate-spin mx-auto mb-3" />
                <p className="text-xs font-semibold">Loading lead records...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl">
                <p className="text-xs font-bold">{error}</p>
              </div>
            ) : (
              <LeadTable
                leads={filteredLeads}
                latestActivitiesMap={latestActivitiesMap}
                connectedLeadsMap={connectedLeadsMap}
                onOpenDetails={(l) => setSelectedLead(l)}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
                onOpenWhatsApp={(l) => {
                  setRowActionLead(l);
                  setActiveMessageModal(true);
                }}
                onOpenCallLog={(l) => {
                  setRowActionLead(l);
                  setActiveCallModal(true);
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* 4. Bottom Footer Bar */}
      {activeTab === 'online' && !selectedLead && (
        <div className="mt-8 pt-5 border-t border-[#E3E1DC] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-450">
          {/* Refresh Timer */}
          <div className="flex items-center gap-1.5 shrink-0">
            <RefreshCw size={13} className={`text-[#E31C1C] cursor-pointer ${loading ? 'animate-spin' : ''}`} onClick={handleManualRefresh} />
            <span>Auto refresh in <span className="text-[#E31C1C]">{countdown}s</span></span>
            <span className="text-slate-300">|</span>
            <button onClick={handleManualRefresh} className="text-[#E31C1C] hover:underline cursor-pointer bg-transparent border-0 font-bold">
              Refresh Now
            </button>
          </div>

          {/* Quick status summary dots */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#3b82f6] rounded-full inline-block" />
              <span className="text-slate-600">{statsCounts.New} New Inquiry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#f59e0b] rounded-full inline-block" />
              <span className="text-slate-600">{statsCounts.Contacted} Contacted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#a855f7] rounded-full inline-block" />
              <span className="text-slate-600">{statsCounts['Follow-up']} Follow-up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full inline-block" />
              <span className="text-slate-600">{statsCounts.Converted} Converted</span>
            </div>
          </div>

          {/* CRM tag */}
          <div className="tracking-wider text-slate-400 font-extrabold uppercase shrink-0">
            JAINS COMPUTER CRM V2.0
          </div>
        </div>
      )}

      {/* Row action modals */}
      {activeCallModal && rowActionLead && (
        <ActivityModal
          lead={rowActionLead}
          onClose={() => {
            setActiveCallModal(false);
            setRowActionLead(null);
          }}
          onSave={handleSaveActivityRow}
        />
      )}

      {activeMessageModal && rowActionLead && (
        <MessageModal
          lead={rowActionLead}
          onClose={() => {
            setActiveMessageModal(false);
            setRowActionLead(null);
          }}
          onSave={handleSaveActivityRow}
        />
      )}
    </div>
  );
}
