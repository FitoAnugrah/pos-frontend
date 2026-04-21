import React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardText from '../text';
import { IconPanel } from '../../../components/ui/Icons';

export default function TerminalCard() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <button 
        onClick={() => navigate('/scan')}
        className="w-full text-left relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]"
      >
        {/* Subtle sleek accent */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>

        <div className="flex flex-col items-center justify-center h-36 text-center relative z-10 w-full">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center mb-5 shadow-inner">
            <IconPanel className="w-6 h-6" color="#ffffff" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-1.5">{dashboardText.terminal.badge}</p>
          <h3 className="text-white text-lg font-bold tracking-tight">{dashboardText.terminal.cta}</h3>
        </div>
      </button>
    </div>
  );
}
