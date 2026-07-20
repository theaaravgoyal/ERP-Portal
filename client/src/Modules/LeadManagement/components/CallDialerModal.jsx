import React, { useState, useEffect } from 'react';
import { Phone, Check, RefreshCw, X } from 'lucide-react';

export default function CallDialerModal({ lead, onClose, onFinish }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  };

  const handleRedial = () => {
    window.open(`tel:${lead.phone}`, '_self');
  };

  return (
    <div className="fixed inset-0 bg-[#0B0A09]/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-8 shadow-2xl relative flex flex-col items-center text-center space-y-6">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between w-full text-[10px] font-bold tracking-wider uppercase text-slate-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400">Active Device Dialer</span>
          </div>
          <span className="font-mono text-slate-500 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-850">
            tel:// protocol
          </span>
        </div>

        {/* Pulse Dialer Icon */}
        <div className="relative w-28 h-28 flex items-center justify-center mt-2">
          {/* Glowing pulse rings */}
          <div className="absolute inset-0 rounded-full bg-rose-500/25 animate-ping opacity-60 pointer-events-none" />
          <div className="absolute inset-2 rounded-full bg-rose-600/30 animate-pulse pointer-events-none" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E31C1C] to-[#ff4747] flex items-center justify-center shadow-lg shadow-rose-500/30 relative z-10">
            <Phone size={32} className="text-white fill-current" />
          </div>
        </div>

        {/* Lead Details */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white">{lead.name}</h2>
          <p className="text-rose-400 font-mono text-sm font-semibold tracking-wide">{lead.phone}</p>
          <div className="pt-2">
            <span className="inline-block border border-slate-800/80 px-3.5 py-1 text-[9px] font-bold text-slate-400 tracking-wider rounded-full uppercase bg-slate-950/20">
              {lead.course} INQUIRY
            </span>
          </div>
        </div>

        {/* Native Dialer Instruction card */}
        <div className="w-full bg-slate-950/40 border border-slate-850 rounded-2xl p-4 text-left space-y-2.5 text-[11px] text-slate-450 font-medium">
          <p className="flex items-start gap-1.5 leading-relaxed">
            <span className="shrink-0 mt-0.5">📞</span>
            <span>We've triggered your device's native dialer to call this student!</span>
          </p>
          <p className="flex items-start gap-1.5 leading-relaxed border-t border-slate-850/60 pt-2">
            <span className="shrink-0 mt-0.5">📱</span>
            <span><strong>On Mobile:</strong> Your phone's calling screen should have automatically slid up.</span>
          </p>
          <p className="flex items-start gap-1.5 leading-relaxed border-t border-slate-850/60 pt-2">
            <span className="shrink-0 mt-0.5">💻</span>
            <span><strong>On Desktop:</strong> FaceTime, Skype, or Your Phone / Phone Link application will prompt to initiate call.</span>
          </p>
        </div>

        {/* Timer */}
        <div className="w-full space-y-1.5">
          <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase block">Dialing Duration</span>
          <div className="bg-slate-950 border border-slate-850 py-3 px-6 rounded-xl inline-block text-xl font-bold font-mono tracking-widest text-white shadow-inner">
            {formatTime(seconds)}
          </div>
        </div>

        {/* Outcome Finished Button */}
        <button
          onClick={onFinish}
          className="w-full bg-[#00c48c] hover:bg-[#00a877] text-white py-3.5 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 cursor-pointer active:scale-98 border-0"
        >
          <Check size={14} strokeWidth={3} />
          <span>Call Finished? Log Outcome</span>
        </button>

        {/* Footer Actions */}
        <div className="flex items-center justify-between w-full pt-2 text-[11px] font-bold border-t border-slate-850/60">
          <button
            onClick={handleRedial}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-0 font-bold"
          >
            <RefreshCw size={12} />
            <span>Redial Link</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer bg-transparent border-0 font-bold"
          >
            <X size={12} />
            <span>Cancel Call</span>
          </button>
        </div>

      </div>
    </div>
  );
}
