import React from 'react';

const STAFF_COLORS = {
  "Sanmati Jain": "bg-brand-red text-white",
  "Sanmate Jain": "bg-brand-red text-white",
  "Aadish Jain": "bg-sky-500 text-white",
  "Neha": "bg-purple-500 text-white",
  "Khushi Soni": "bg-emerald-500 text-white",
};

export default function LeadConnectionSummary({ activities }) {
  const connected = activities.filter(
    (a) => a.callStatus === "Connected" || a.callStatus === "Message Sent"
  );
  const staffEngaged = [...new Set(activities.map((a) => a.staffName))];

  const getStaffBadge = (name) => {
    return STAFF_COLORS[name] || "bg-slate-600 text-slate-100";
  };

  const staffConnectionsMap = {};
  connected.forEach((a) => {
    if (!a.staffName) return;
    if (!staffConnectionsMap[a.staffName]) {
      staffConnectionsMap[a.staffName] = { count: 0, lastNote: a.notes, lastTime: a.createdAt };
    }
    staffConnectionsMap[a.staffName].count += 1;
    if (new Date(a.createdAt) > new Date(staffConnectionsMap[a.staffName].lastTime)) {
      staffConnectionsMap[a.staffName].lastNote = a.notes;
      staffConnectionsMap[a.staffName].lastTime = a.createdAt;
    }
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black text-slate-450 uppercase tracking-wider">Connection Summary</h3>
      
      {/* Metrics Cards row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6E1] shadow-inner text-center">
          <span className="text-2xl font-black text-slate-800">{connected.length}</span>
          <span className="text-[9px] text-slate-400 font-extrabold block uppercase mt-0.5">Connected</span>
        </div>
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6E1] shadow-inner text-center">
          <span className="text-2xl font-black text-slate-800">{staffEngaged.length}</span>
          <span className="text-[9px] text-slate-400 font-extrabold block uppercase mt-0.5">Staff Engaged</span>
        </div>
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E6E1] shadow-inner text-center">
          <span className="text-2xl font-black text-slate-800">{activities.length}</span>
          <span className="text-[9px] text-slate-400 font-extrabold block uppercase mt-0.5">Total Logs</span>
        </div>
      </div>

      {/* Connected Staff Breakdown */}
      {connected.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(staffConnectionsMap).map(([name, data]) => (
            <div key={name} className="flex gap-3 p-4 rounded-xl bg-white border border-[#E8E6E1] shadow-sm">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${getStaffBadge(name)}`}>
                {name.charAt(0)}
              </div>
              <div className="space-y-1 overflow-hidden flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">{name}</span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase">{data.count} Contact{data.count > 1 ? 's' : ''}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal truncate italic mt-0.5">"{data.lastNote}"</p>
                <span className="text-[9px] text-slate-400 font-bold block">
                  Last contact: {new Date(data.lastTime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
