import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import Card from '../../components/Card';
import { DynamicIcon } from '../../components/Sidebar';
import { COLORS } from '../../constants/Colors';
import { PERMISSIONS } from '../../constants/Permissions';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dynamically load permitted modules lists from user profile claims and filter unknown ones
  const permittedModules = (user?.permissions || []).filter(mod => 
    Object.values(PERMISSIONS).includes(mod.code)
  );

  // A helper map to assign specific accent color gradients for card aesthetics
  const colorSchemes = {
    [PERMISSIONS.ACCESS_ATTENDANCE]: COLORS.ATTENDANCE,
    [PERMISSIONS.ACCESS_FEES]: COLORS.FEES_MANAGEMENT,
    [PERMISSIONS.ACCESS_LEADS]: COLORS.DEFAULT
  };

  const defaultColorScheme = COLORS.DEFAULT;

  const descriptions = {
    [PERMISSIONS.ACCESS_ATTENDANCE]: 'Track personnel logs, manage check-ins/outs, and generate real-time attendance reports.',
    [PERMISSIONS.ACCESS_FEES]: 'Oversee accounts receivables, client billing profiles, receipts, and outstanding dues.',
    [PERMISSIONS.ACCESS_LEADS]: 'Monitor website inquiries, track counseling logs, and optimize marketing source conversions.'
  };

  const defaultDescription = 'Manage administration, process reports, and execute role activities.';

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-10 font-sans">
      {/* Welcome Banner */}
      <Card className="relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-80 h-full bg-rose-100/60 blur-[80px] pointer-events-none rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-60 h-32 bg-pink-100/40 blur-[60px] pointer-events-none rounded-full"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-brand-red text-xs font-semibold">
            <Sparkles size={12} />
            <span>Enterprise Workspace Active</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
            Welcome, <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">{user?.name || 'User'}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2.5 mt-2">
            <span className="text-xs text-slate-400">Current Role:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-brand-red text-[10px] font-bold uppercase tracking-wider">
              {user?.role || 'Guest'}
            </span>
          </div>
        </div>
      </Card>

      {/* Grid of Module Cards */}
      <div className="flex flex-col flex-1 space-y-6">
        <div className="flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Your Modules</h2>
          <p className="text-xs text-slate-400 mt-1">Select an active module card below to begin administrative tasks.</p>
        </div>

        {permittedModules.length === 0 ? (
          <Card className="text-center py-12 bg-rose-50/50 border-rose-100">
            <p className="text-slate-400 font-medium">No permitted modules found for your role profile.</p>
          </Card>
        ) : (
          <div className="gap-6 flex flex-nowrap justify-center items-center">
            {permittedModules.map((mod, index) => {
              const color = colorSchemes[mod.code] || defaultColorScheme;
              const desc = descriptions[mod.code] || defaultDescription;

              return (
                <Card 
                  key={index}
                  onClick={() => navigate(mod.route)}
                  className={`flex flex-col justify-between ${mod.module==="Lead Management"?'h-full':'h-[75%]'} group ${color}`}
                >
                  {/* Module Icon and Status */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center transition-colors group-hover:bg-white/40">
                      <DynamicIcon name={mod.icon} className="text-white transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/25 border border-white/30 text-white/90">
                      Active
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {mod.module}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Footer Link Action */}
                  <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between text-xs font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors">
                    <span>Launch Module</span>
                    <div className="w-6 h-6 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center transition-all group-hover:translate-x-1 group-hover:bg-white/30">
                      <ArrowRight size={12} className="text-white" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
