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

  // Dynamically load permitted modules lists from user profile claims
  const permittedModules = user?.permissions || [];

  // A helper map to assign specific accent color gradients for card aesthetics
  const colorSchemes = {
    [PERMISSIONS.ACCESS_ATTENDANCE]: COLORS.ATTENDANCE,
    [PERMISSIONS.ACCESS_SITE]: COLORS.SITE_MANAGEMENT,
    [PERMISSIONS.ACCESS_FEES]: COLORS.FEES_MANAGEMENT,
    [PERMISSIONS.ACCESS_LEADS]: COLORS.DEFAULT
  };

  const defaultColorScheme = COLORS.DEFAULT;

  const descriptions = {
    [PERMISSIONS.ACCESS_ATTENDANCE]: 'Track personnel logs, manage check-ins/outs, and generate real-time attendance reports.',
    [PERMISSIONS.ACCESS_SITE]: 'Monitor ongoing site activities, control resources, and organize inventory metrics.',
    [PERMISSIONS.ACCESS_FEES]: 'Oversee accounts receivables, client billing profiles, receipts, and outstanding dues.',
    [PERMISSIONS.ACCESS_LEADS]: 'Monitor website inquiries, track counseling logs, and optimize marketing source conversions.'
  };

  const defaultDescription = 'Manage administration, process reports, and execute role activities.';

  return (
    <div className="space-y-10 font-sans">
      {/* Welcome Banner */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-brand-red/10 to-slate-900">
        <div className="absolute top-0 right-0 w-80 h-full bg-brand-red/5 blur-[80px] pointer-events-none rounded-full"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/20 text-brand-red text-xs font-semibold">
            <Sparkles size={12} />
            <span>Enterprise Workspace Active</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Welcome, <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">{user?.name || 'User'}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2.5 mt-2">
            <span className="text-xs text-slate-400">Current Role:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-red/20 border border-brand-red/20 text-brand-red text-[10px] font-bold uppercase tracking-wider">
              {user?.role || 'Guest'}
            </span>
          </div>
        </div>
      </Card>

      {/* Grid of Module Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Your Modules</h2>
          <p className="text-xs text-slate-500 mt-1">Select an active module card below to begin administrative tasks.</p>
        </div>

        {permittedModules.length === 0 ? (
          <Card className="text-center py-12 bg-slate-900/10 border-slate-800">
            <p className="text-slate-400 font-medium">No permitted modules found for your role profile.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {permittedModules.map((mod, index) => {
              const color = colorSchemes[mod.code] || defaultColorScheme;
              const desc = descriptions[mod.code] || defaultDescription;

              return (
                <Card 
                  key={index}
                  onClick={() => navigate(mod.route)}
                  className={`flex flex-col justify-between min-h-[250px] group ${color}`}
                >
                  {/* Module Icon and Status */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center transition-colors group-hover:border-brand-red/25">
                      <DynamicIcon name={mod.icon} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                      Active
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-red transition-colors">
                      {mod.module}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Footer Link Action */}
                  <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold tracking-wide text-slate-400 group-hover:text-white transition-colors">
                    <span>Launch Module</span>
                    <div className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center transition-all group-hover:translate-x-1 group-hover:bg-brand-red group-hover:border-brand-red">
                      <ArrowRight size={12} className="text-slate-400 group-hover:text-white" />
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
