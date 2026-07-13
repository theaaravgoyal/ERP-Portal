import React from 'react';
import Breadcrumb from './Breadcrumb';

const PageHeader = ({ title, description, children, className = '' }) => {
  return (
    <div className={`mb-8 space-y-1.5 ${className}`}>
      <Breadcrumb />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          {description && <p className="text-slate-400 text-sm leading-relaxed">{description}</p>}
        </div>
        {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
