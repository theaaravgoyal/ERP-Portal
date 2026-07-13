import React from 'react';

const Loader = ({ message = 'Loading ERP Portal...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
      {message && <p className="text-slate-400 font-medium text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
