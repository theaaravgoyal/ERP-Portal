import React from 'react';

const Input = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-red transition-colors" size={18} />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full py-3 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-600 outline-none focus:ring-4 focus:ring-brand-red/10 transition-all text-sm
            ${Icon ? 'pl-12' : 'pl-4'}
            ${error 
              ? 'border-rose-500/55 focus:border-rose-500/80 focus:ring-rose-500/10' 
              : 'border-slate-800 focus:border-brand-red/50'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-rose-400 font-medium mt-1 pl-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
