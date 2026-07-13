import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { ROUTES } from '../constants/Routes';

const Unauthorized = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-lg mx-auto font-sans">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-rose-500/10 blur-xl animate-pulse"></div>
        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 text-rose-455 rounded-3xl flex items-center justify-center relative z-10">
          <ShieldAlert size={40} />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Access Denied</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          You do not have the required permissions to view this module. This resource is restricted to authorized administrative personnel.
        </p>
      </div>

      {user && (
        <Card className="w-full !p-4 flex justify-between items-center text-xs">
          <div className="text-left space-y-0.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider block">Your Profile</span>
            <span className="text-white font-medium">{user.name}</span>
          </div>
          <div className="text-right space-y-0.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider block">Assigned Role</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-450 border border-rose-500/20 font-semibold uppercase tracking-wider text-[10px]">
              {user.role}
            </span>
          </div>
        </Card>
      )}

      <div className="flex gap-4">
        <Button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          variant="secondary"
        >
          <ArrowLeft size={14} />
          <span>Dashboard</span>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
