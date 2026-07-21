import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const ProtectedLayout = ({ children }) => {
  return (
    // Full-screen container with clean white background
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      
      {/* Floating sidebar — fixed, floats over the background seamlessly */}
      <Sidebar />

      {/* Full-width column — pl offsets content from behind the sidebar.
          The background continues edge-to-edge so there is no hard cut. */}
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex items-center justify-center flex-col overflow-y-auto">
          <div className="p-6 md:p-10 self-end w-[95vw]">
            {children}
          </div>

          {/* Shared Enterprise Footer */}
          <footer className="py-[2vh] px-8 bg-slate-50 border-t w-full border-slate-200 text-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} ERP Portal. All rights reserved. Scalable Enterprise Edition.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
