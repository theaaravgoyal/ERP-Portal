import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const ProtectedLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      <Sidebar
        user={user}
        logout={logout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Navbar
          user={user}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        <main className="flex-1 overflow-y-auto flex flex-col justify-between">
          <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex-1">
            {children}
          </div>
          
          {/* Shared Enterprise Footer */}
          <footer className="py-5 px-8 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-650">
            <p>&copy; {new Date().getFullYear()} ERP Portal. All rights reserved. Scalable Enterprise Edition.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
