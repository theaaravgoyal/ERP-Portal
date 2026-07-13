import React from 'react';
import { Search } from 'lucide-react';

export default function LeadSearch({ query, setQuery }) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by student name, email address, phone number..."
        className="w-full bg-[#F0EEEA] hover:bg-[#E8E6E1]/70 focus:bg-white text-sm text-slate-800 pl-11 pr-4 py-2.5 rounded-xl border border-transparent focus:border-slate-350 focus:outline-none transition-all placeholder:text-slate-450"
      />
    </div>
  );
}
