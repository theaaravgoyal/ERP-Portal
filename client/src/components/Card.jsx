import React from 'react';

const Card = ({ children, className = '', onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-xl
        ${onClick ? 'cursor-pointer hover:-translate-y-1.5 hover:bg-slate-900/65' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
