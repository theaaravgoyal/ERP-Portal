import React from 'react';
    import { Menu, Bell } from 'lucide-react';

    const Navbar = ({ user, setMobileMenuOpen, mobileMenuOpen }) => {
      return (
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between md:justify-end gap-4 h-20 shrink-0">
          {/* Mobile hamburger brand */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-red to-brand-red-hover flex items-center justify-center font-bold text-white shadow-lg shadow-brand-red/20">
              EP
            </div>
            <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              ERP Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-red"></span>
            </button>

            {/* User profile */}
            <div className="hidden md:flex items-center gap-3 border-l border-slate-800 pl-4 select-none">
              <div className="text-right">
                <p className="text-sm font-semibold text-white leading-tight">{user?.name}</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">{user?.role}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </header>
      );
    };

    export default Navbar;
    
