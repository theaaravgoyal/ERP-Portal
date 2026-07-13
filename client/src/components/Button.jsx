import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  ...props 
}) => {
  const baseStyle = 'px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-brand-red to-brand-red-hover text-white shadow-lg shadow-brand-red/20 hover:shadow-brand-red/35 active:scale-[0.97]',
    secondary: 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80',
    danger: 'bg-rose-500/10 border border-rose-500/20 text-rose-450 hover:bg-rose-600 hover:text-white hover:border-transparent',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
