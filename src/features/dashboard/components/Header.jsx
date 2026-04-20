import React from 'react';
import dashboardText from '../text';
import { IconUserCircle, IconBell } from '../../../components/ui/Icons';

export default function Header({ onProfileClick }) {
  return (
    <header className="flex items-center justify-between px-6 pt-6 pb-4">
      <button 
        onClick={onProfileClick}
        className="flex items-center gap-3 text-left transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
        <div className="relative">
          <div className="h-11 w-11 bg-gradient-to-tr from-slate-800 to-slate-700 shadow-sm rounded-full flex items-center justify-center">
            <IconUserCircle className="w-6 h-6" color="#E2E8F0" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#F4F8FA] rounded-full"></div>
        </div>
        <div>
          <h2 className="text-slate-800 font-bold text-base leading-tight">{dashboardText.brand}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_4px_rgba(16,185,129,0.5)]"></span>
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">{dashboardText.brandSub}</span>
          </div>
        </div>
      </button>
      <button className="relative w-10 h-10 bg-slate-200/50 text-slate-600 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-slate-200 active:scale-95">
        <IconBell className="w-5 h-5" />
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F4F8FA]"></span>
      </button>
    </header>
  );
}
