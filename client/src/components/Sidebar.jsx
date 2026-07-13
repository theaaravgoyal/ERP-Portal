import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ROUTES } from '../constants/Routes';

// Reusable Dynamic Icon Renderer mapping string name to Lucide components
const DynamicIcon = ({ name, size = 20, className = '' }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const Sidebar = ({ user, logout, mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  // Base layout navigation options
  const defaultNavItems = [
    { 
      name: 'Dashboard', 
      path: ROUTES.DASHBOARD, 
      icon: 'LayoutDashboard'
    }
  ];

  // Convert user permission routes to navigation items
  const permissionNavItems = user?.permissions ? user.permissions.map(p => ({
    name: p.module,
    path: p.route,
    icon: p.icon
  })) : [];

  const navItems = [...defaultNavItems, ...permissionNavItems];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
      md:relative md:transform-none md:flex
      ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div>
        {/* Brand Header */}
        <div className="h-20 px-8 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-red to-brand-red-hover flex items-center justify-center font-bold text-white shadow-lg shadow-brand-red/20">
              EP
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              ERP Portal
            </span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Icons.X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-brand-red/15 text-brand-red border border-brand-red/30 shadow-inner' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }
                `}
              >
                <DynamicIcon 
                  name={item.icon} 
                  className={`
                    transition-transform duration-200 group-hover:scale-110
                    ${isActive ? 'text-brand-red' : 'text-slate-400 group-hover:text-slate-350'}
                  `} 
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Panel */}
      <div className="p-6 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3.5 mb-4 font-sans">
          <div className="w-10 h-10 rounded-full bg-slate-850 border border-slate-700 flex items-center justify-center text-slate-355 font-bold shrink-0">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm truncate text-white">
              {user?.name || 'User'}
            </p>
            <span className="px-1.5 py-0.5 rounded bg-brand-red/20 border border-brand-red/20 text-brand-red text-[9px] font-bold uppercase tracking-wider block mt-0.5 w-max">
              {user?.role || 'Guest'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all duration-200 font-medium text-sm"
        >
          <Icons.LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
export { DynamicIcon };
