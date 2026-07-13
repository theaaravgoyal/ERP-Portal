import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../constants/Routes';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Hide breadcrumb on primary home/dashboard
  if (location.pathname === ROUTES.DASHBOARD || location.pathname === '/') return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 select-none">
      <Link to={ROUTES.DASHBOARD} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
        <Home size={13} />
        <span>Home</span>
      </Link>
      
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = value
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        return (
          <React.Fragment key={to}>
            <ChevronRight size={12} className="text-slate-700" />
            {isLast ? (
              <span className="text-brand-red">{displayName}</span>
            ) : (
              <Link to={to} className="text-slate-400 hover:text-white transition-colors">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
