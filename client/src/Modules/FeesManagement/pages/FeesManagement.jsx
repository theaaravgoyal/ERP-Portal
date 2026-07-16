import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ArrowLeft, Construction } from 'lucide-react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import PageHeader from '../../../components/PageHeader';

const FeesManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Fees Management" 
        description="Oversee accounts receivables, client billing profiles, and collections."
      >
        <Button 
          variant="secondary" 
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={16} />
          <span>Dashboard</span>
        </Button>
      </PageHeader>

      <Card className="text-center max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/5 blur-[60px] pointer-events-none rounded-full"></div>
        
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/5 mb-6">
          <DollarSign size={32} />
        </div>

        <div className="space-y-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold uppercase tracking-wider text-amber-600">
            <Construction size={10} className="text-amber-500" />
            <span>Modular Architecture Integration</span>
          </span>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Financial Operations Panel</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            This module has been refactored into modular architecture components. It is ready to accept CRUD services and components inside the specific module folders.
          </p>
        </div>

        <div className="border-t border-rose-100 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-[#fdf8f8] border border-rose-100 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Route Path</span>
              <code className="text-[11px] text-brand-red">/fees-management</code>
            </div>
            <div className="p-4 bg-[#fdf8f8] border border-rose-100 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Subfolder</span>
              <span className="text-xs font-semibold text-emerald-600">Modules/FeesManagement/</span>
            </div>
            <div className="p-4 bg-[#fdf8f8] border border-rose-100 rounded-xl col-span-2 md:col-span-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Status</span>
              <span className="text-xs text-slate-600 font-medium">Ready for Integration</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeesManagement;
