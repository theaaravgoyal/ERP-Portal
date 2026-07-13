import React from 'react';

const Table = ({ headers = [], children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto bg-slate-900/40 border border-slate-800 rounded-2xl ${className}`}>
      <table className="w-full text-left border-collapse text-sm text-slate-350">
        {headers.length > 0 && (
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/50">
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-xs">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-800/60">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
