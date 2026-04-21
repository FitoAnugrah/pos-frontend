import React from 'react';
import TerminalCard from './components/TerminalCard';
import StatsRow from './components/StatsRow';
import QuickAccess from './components/QuickAccess';
import ActivityFeed from './components/ActivityFeed';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onQuickAccess }) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Desktop Topbar */}
      <div className="hidden md:flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
         <div>
           <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
           <p className="text-sm font-medium text-slate-500 mt-1">Ringkasan aktivitas dan kasir hari ini.</p>
         </div>
         {/* User Profile Hook for Desktop */}
         <button onClick={() => navigate('/profil')} className="h-11 w-11 bg-slate-200 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
           <div className="text-slate-500 font-bold text-sm">A</div>
         </button>
      </div>

      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col flex-1">
        {/* Responsive Grid Layout */}
        <div className="md:grid md:grid-cols-12 md:gap-8 flex flex-col gap-6">
          
          {/* Left Column (Main Terminal & Stats) */}
          <div className="md:col-span-8 flex flex-col gap-6">
            <TerminalCard />
            <StatsRow />
            <div className="hidden md:block">
              <ActivityFeed />
            </div>
          </div>

          {/* Right Column (Quick Access & Activity Feed on Mobile) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <QuickAccess onItemClick={onQuickAccess} />
            <div className="md:hidden block">
              <ActivityFeed />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
