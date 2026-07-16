import React from 'react';

const Table = ({ headers = [], children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto bg-white border border-rose-100 rounded-2xl shadow-sm shadow-rose-100/30 ${className}`}>
      <table className="w-full text-left border-collapse text-sm text-slate-700">
        {headers.length > 0 && (
          <thead>
            <tr className="border-b border-rose-100 bg-[#fdf8f8]">
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-rose-50">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
