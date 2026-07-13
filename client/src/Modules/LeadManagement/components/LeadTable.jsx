import React from 'react';
import LeadRow from './LeadRow';
import { HelpCircle } from 'lucide-react';

export default function LeadTable({
  leads,
  latestActivitiesMap,
  connectedLeadsMap,
  onOpenDetails,
  onUpdateStatus,
  onDelete,
  onOpenWhatsApp,
  onOpenCallLog
}) {
  if (leads.length === 0) {
    return (
      <div className="bg-white border border-[#EBEAE6] rounded-2xl p-12 text-center shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
          <div className="w-12 h-12 rounded-full bg-[#F4F2EE] border border-[#E3E1DC] flex items-center justify-center">
            <HelpCircle size={20} className="text-slate-505" />
          </div>
          <h4 className="font-extrabold text-slate-700 text-sm">No Leads Found</h4>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            We couldn't find any inquiries matching your selection. Try clearing search filters or add a new simulation lead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {leads.map((lead) => {
        const latest = latestActivitiesMap[lead._id || lead.id];
        const connected = connectedLeadsMap[lead._id || lead.id];

        return (
          <LeadRow
            key={lead._id || lead.id}
            lead={lead}
            latestActivity={latest}
            connectedStaff={connected}
            onOpenDetails={onOpenDetails}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
            onOpenWhatsApp={onOpenWhatsApp}
            onOpenCallLog={onOpenCallLog}
          />
        );
      })}
    </div>
  );
}
