import React from 'react';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Award,
  ArrowRight,
  User,
  UserX
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const chartData = [
    { name: '01 Jul', value: 0.00001},
    { name: '02 Jul', value: 0.00001},
    { name: '03 Jul', value: 0.00001},
    { name: '04 Jul', value: 2 },
    { name: '05 Jul', value: 0.95 },
    { name: '06 Jul', value: 0.00001},
    { name: '07 Jul', value: 2 },
    { name: '08 Jul', value: 2 },
  ];

  return (
    <div className="bg-white h-[85vh] overflow-hidden text-slate-800 font-sans flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Welcome Back, Aadish! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            Real-time student lead metrics and staff operations.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#f4f4f5] px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-slate-600">Live Monitoring Mode</span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 shrink-0">
        {/* Card 1 */}
        <div className="bg-[#e31b23] rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between h-28">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start z-10">
            <h3 className="text-white font-bold text-xs tracking-wider">TOTAL INQUIRIES</h3>
            <div className="bg-white/20 p-2 rounded-xl">
              <Users size={18} className="text-white" />
            </div>
          </div>
          <div className="flex items-end gap-3 z-10 mt-auto">
            <span className="text-5xl font-black text-white leading-none">7</span>
            <div className="bg-white/90 px-3 py-1 rounded-full mb-1">
              <span className="text-[#e31b23] text-[10px] font-bold">+2 Active</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <h3 className="text-slate-500 font-bold text-xs tracking-wider">ADMISSIONS COMPLETED</h3>
            <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
              <CheckCircle size={18} className="text-emerald-500" />
            </div>
          </div>
          <div className="flex items-end gap-3 mt-auto">
            <span className="text-5xl font-black text-slate-800 leading-none">1</span>
            <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 mb-1">
              <span className="text-emerald-600 text-[10px] font-bold">Enrolled</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <h3 className="text-slate-500 font-bold text-xs tracking-wider">SCHEDULED FOLLOW-UPS</h3>
            <div className="bg-amber-50 p-2 rounded-xl border border-amber-100">
              <Clock size={18} className="text-amber-500" />
            </div>
          </div>
          <div className="flex items-end gap-3 mt-auto">
            <span className="text-5xl font-black text-slate-800 leading-none">1</span>
            <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100 mb-1">
              <span className="text-amber-600 text-[10px] font-bold">Callbacks</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <h3 className="text-slate-500 font-bold text-xs tracking-wider">SUCCESS RATE</h3>
            <div className="bg-indigo-50 p-2 rounded-xl border border-indigo-100">
              <Award size={18} className="text-indigo-500" />
            </div>
          </div>
          <div className="flex items-end gap-3 mt-auto">
            <span className="text-5xl font-black text-slate-800 leading-none">14%</span>
            <div className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 mb-1">
              <span className="text-indigo-600 text-[10px] font-bold">Admissions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Column - Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">INQUIRY VOLUME OVERVIEW</h2>
              <p className="text-slate-500 text-xs font-medium mt-1">Chronological student registrations over last 8 days</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-[#e31b23] rounded-sm"></div>
              <span className="text-xs font-bold text-slate-800">Student Inquiries (Leads)</span>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barSize={44}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }}
                  domain={[0, 2]}
                  ticks={[0, 1, 2]}
                />
                <Bar 
                  dataKey="value" 
                  fill="#e31b23" 
                  radius={[8, 8, 8, 8]}
                  background={{ fill: '#f4f4f5', radius: [8, 8, 8, 8] }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-1 flex flex-col gap-6 h-full overflow-hidden">
          
          {/* Recent Leads */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 flex-1 overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">RECENT LEADS OVERVIEW</h2>
              </div>
              <button className="text-[#e31b23] text-xs font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="space-y-3 overflow-y-auto flex-1 min-h-0">
              {/* Lead Item 1 */}
              <div className="bg-[#f8f9fa] border border-slate-200 rounded-xl p-4 flex justify-between items-center relative overflow-hidden group">
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-slate-200 rounded-r-xl"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-800 text-sm">Karan Malhotra</h4>
                    <span className="text-[10px] text-slate-400 font-bold">L-107</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Data Analytics</p>
                </div>
                <div className="bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 mr-2">
                  <span className="text-blue-600 text-[9px] font-black uppercase tracking-wider">CONTACTED</span>
                </div>
              </div>

              {/* Lead Item 2 */}
              <div className="bg-[#f8f9fa] border border-slate-200 rounded-xl p-4 flex justify-between items-center relative overflow-hidden group">
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-slate-200 rounded-r-xl"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-800 text-sm">Priya Kumari</h4>
                    <span className="text-[10px] text-slate-400 font-bold">L-102</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Tally & GST</p>
                </div>
                <div className="bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-100 mr-2">
                  <span className="text-cyan-600 text-[9px] font-black uppercase tracking-wider">NEW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Attendance */}
          <div className="bg-white rounded-2xl max-h-[15rem] p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-5 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">STAFF ATTENDANCE OVERVIEW</h2>
                <p className="text-slate-500 text-xs font-medium mt-1">Tap names to toggle status for today</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-md border border-emerald-100">4 Present</span>
                <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-2 py-1 rounded-md border border-rose-100">2 Absent</span>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 min-h-0">
            {/* Present Staff */}
            <div className="mb-5">
              <div className="flex items-center gap-2 text-emerald-600 mb-3">
                <User size={14} className="stroke-[2.5]" />
                <span className="text-xs font-black tracking-wide">PRESENT STAFF (4)</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-bold text-slate-700">Aadish Jain (Admin)</span>
                </div>
                <div className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-bold text-slate-700">Amit Kumar</span>
                </div>
                <div className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-bold text-slate-700">Rohit Sharma</span>
                </div>
                <div className="bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-bold text-slate-700">Neha Joshi</span>
                </div>
              </div>
            </div>

            {/* Absent Staff */}
            <div>
              <div className="flex items-center gap-2 text-rose-500 mb-3">
                <UserX size={14} className="stroke-[2.5]" />
                <span className="text-xs font-black tracking-wide">ABSENT STAFF (2)</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span className="text-xs font-bold text-slate-700">Sanjay Gupta</span>
                </div>
                <div className="bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span className="text-xs font-bold text-slate-700">Aarav Goyal</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
