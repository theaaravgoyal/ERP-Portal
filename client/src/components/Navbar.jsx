import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/Routes';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 h-[8vh] shrink-0 shadow-sm shadow-slate-100/40">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-xl text-slate-700 hidden md:block">
          JCMS
        </span>
        <div className="flex items-center gap-3 md:hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-red to-rose-400 flex items-center justify-center font-bold text-white shadow-md shadow-rose-300/30">
            EP
          </div>
          <span className="font-semibold text-lg tracking-tight text-slate-700">
            ERP Portal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 text-slate-400 hover:text-brand-red rounded-lg hover:bg-slate-50 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-red"></span>
        </button>

        {/* User profile with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 border-l border-slate-200 pl-4 select-none cursor-pointer group"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 leading-tight group-hover:text-brand-red transition-colors">{user?.name}</p>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">{user?.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-red font-bold text-sm transition-transform duration-200 group-hover:scale-105 shadow-sm">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
          </div>

          {/* Dropdown Menu */}
          <div 
            className={`absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-100/50 py-2 transition-all duration-300 origin-top-right z-50
              ${dropdownOpen ? 'transform opacity-100 scale-100 translate-y-0' : 'transform opacity-0 scale-95 -translate-y-2 pointer-events-none'}
            `}
          >
            <div className="px-4 py-2 border-b border-slate-100 mb-1 sm:hidden">
              <p className="text-sm font-semibold text-slate-700 truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-brand-red hover:bg-slate-50 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
    
