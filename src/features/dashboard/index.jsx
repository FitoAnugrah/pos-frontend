import React from 'react';
import Header from './components/Header';
import TerminalCard from './components/TerminalCard';
import StatsRow from './components/StatsRow';
import QuickAccess from './components/QuickAccess';
import ActivityFeed from './components/ActivityFeed';
import BottomNav from './components/BottomNav';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1A1D20] flex justify-center w-full font-sans">
      {/* Mobile App Container matching the design dimensions */}
      <div className="w-full max-w-[440px] bg-[#F4F8FA] min-h-screen relative shadow-2xl overflow-x-hidden">
        <Header />
        
        <div className="pb-4">
          <TerminalCard />
          <StatsRow />
          <QuickAccess />
          <ActivityFeed />
        </div>
        
        <BottomNav />
      </div>
    </div>
  );
}
