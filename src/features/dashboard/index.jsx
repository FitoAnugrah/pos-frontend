import React from 'react';
import Header from './components/Header';
import TerminalCard from './components/TerminalCard';
import StatsRow from './components/StatsRow';
import QuickAccess from './components/QuickAccess';
import ActivityFeed from './components/ActivityFeed';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';

export default function Dashboard({ activeTab = 'terminal', onTabChange, onQuickAccess }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans w-full justify-center md:justify-start">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[440px] md:max-w-none bg-[#F4F8FA] md:bg-transparent overflow-y-auto overflow-x-hidden shadow-2xl md:shadow-none flex flex-col relative">
        
        {/* Desktop header is hidden since Sidebar handles brand, but mobile Header stays */}
        <div className="md:hidden">
          <Header onProfileClick={() => onTabChange && onTabChange('profil')} />
        </div>
        
        {/* Desktop Topbar */}
        <div className="hidden md:flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
           <div>
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
             <p className="text-sm font-medium text-slate-500 mt-1">Ringkasan aktivitas dan kasir hari ini.</p>
           </div>
           {/* User Profile Hook for Desktop */}
           <button onClick={() => onTabChange && onTabChange('profil')} className="h-11 w-11 bg-slate-200 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">
             <div className="text-slate-500 font-bold text-sm">A</div>
           </button>
        </div>

        <div className="pb-24 md:pb-8 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col flex-1">
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
        
        {/* Mobile Bottom Navigation (hidden on desktop) */}
        <div className="md:hidden">
          <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>
    </div>
  );
}

